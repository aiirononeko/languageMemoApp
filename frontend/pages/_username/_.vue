<template>
  <!-- マイページの２階層以下 -->
  <div>
    <username-index-template
      :can-action="canAction"
      :current-path="currentPath"
      :current-username="currentUsername"
      :user-info="userInfo"
      :folders-info="foldersInfo"
      :is-creating-new-folder="isCreatingNewFolder"
      :is-creating-new-file="isCreatingNewFile"
      @create-file="onCreateFile"
      @create-folder="onCreateFolder"
      @change-file-name="onChangeFileName"
      @change-folder-name="onChangeFolderName"
      @delete-file="onDeleteFile"
      @delete-folder="onDeleteFolder"
      @trigger-creating-new-folder="triggerCreatingNewFolder"
      @trigger-creating-new-file="triggerCreatingNewFile"
    />
  </div>
</template>

<script>
import User from '~/types/User'
import Folder from '~/types/Folder'
import { pathToArr, getDirname } from '~/utils/path'
const UsernameIndexTemplate = () => import('~/components/templates/UsernameIndexTemplate')

export default {
  components: {
    UsernameIndexTemplate
  },

  data: () => ({
    isCreatingNewFolder: false,
    isCreatingNewFile: false,
  }),

  computed: {
    authUsername() {
      return this.$store.getters["authentication/username"]
    },

    canAction() {
      return this.isAuthenticated
        ? this.currentUsername === this.authUsername
        : false
    },

    currentUsername() {
      return this.params.username
    },

    currentPath() {
      return this.$route.path
    },

    isAuthenticated() {
      return this.$store.getters["authentication/isAuthenticated"]
    },

    params() {
      return this.$route.params
    },

    parentParams() {
      return this.params.pathMatch
    },

    userID() {
      return this.$store.getters["authentication/id"]
    }
  },

  methods: {
    async onCreateFolder(newFolderName) {
      const folderInfo = {
        name: newFolderName,
        public: false,
        user_id: this.userID,
        parent_id: this.foldersInfo.id
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/folders`, folderInfo)
        this.foldersInfo = new Folder(data)
        this.triggerCreatingNewFolder()
      } catch(e) {
        return this.$nuxt.error({
          statusCode: e.response.status
        })
      }
    },

    async onCreateFile(newFileName) {
      const postsInfo = {
        name: newFileName,
        content: newFileName,
        public: false,
        user_id: this.userID,
        folder_id:  this.foldersInfo.id
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/posts`, postsInfo)

        // 既存の配列を更新
        this.foldersInfo = Folder.pushPost(this.foldersInfo, data)

        this.triggerCreatingNewFile()
      } catch(e) {
        console.error(e)
      }
    },

    async fetchData() {
      try {
        const { data } = await this.$axios.$get(`/api/v1/folders/${this.parentParams}`)
        this.foldersInfo = new Folder(data)
        this.triggerCreatingNewFolder()
      } catch (e) {
        console.error(e)
      }
    },

    async onChangeFileName({ id, name }) {
      try {
        const { data } = await this.$axios.$put(`/api/v1/posts/${id}`, {
          name
        })

        this.foldersInfo = Folder.updatePost(this.foldersInfo, id, data)
      } catch (e) {
        console.log(e)
      }
    },

    async onChangeFolderName({ id, name }) {
      try {
        const { data } = await this.$axios.$put(`/api/v1/folders/${id}`, {
          name
        })

        this.foldersInfo = Folder.updateChildFolder(this.foldersInfo, id, data)
      } catch (e) {
        console.log(e)
      }
    },

    async onDeleteFile({ id }) {
      try {
        await this.$axios.$delete(`/api/v1/posts/${id}`)

        this.foldersInfo = Folder.deletePost(this.foldersInfo, id)
      } catch (e) {
        console.log(e)
      }
    },

    async onDeleteFolder({ id }) {
      try {
        await this.$axios.$delete(`/api/v1/folders/${id}`)

        this.foldersInfo = Folder.deleteChildFolder(this.foldersInfo, id)
      } catch (e) {
        console.log(e)
      }
    },

    triggerCreatingNewFolder() {
      this.isCreatingNewFolder = !this.isCreatingNewFolder
    },

    triggerCreatingNewFile() {
      this.isCreatingNewFile = !this.isCreatingNewFile
    }
  },

  async asyncData({ $axios, params, store, error }) {
    const folder_id = getDirname(params.pathMatch)
    const ancestor_folder_id = pathToArr(params.pathMatch)
    let userInfo, foldersInfo

    try {
      userInfo = await $axios.$get(`/api/v1/users/${params.username}`)

      foldersInfo = await $axios.$get(`/api/v1/folders/${folder_id}`)
    } catch (e) {
      if (e.response && e.response.status) {
        return error({
          statusCode: e.response.status
        })
      }

      return error({
        statusCode: 500
      })
    }

    for (const apiAncestorFolder of foldersInfo.data.attributes["ancestor-folders"]) {
      const str = ancestor_folder_id.pop()
      if (str !== String(apiAncestorFolder.id)) {
        return error({
          statusCode: 404
        })
      }
    }

    return { userInfo: new User(userInfo.data), foldersInfo: new Folder(foldersInfo.data) }
  },
}
</script>

<style lang="scss" scoped>

</style>
