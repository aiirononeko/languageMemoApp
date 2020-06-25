<template>
  <!-- マイページの２階層以下 -->
  <div>
    <username-index-template
      :current-username="currentUsername"
      :user-info="userInfo"
      :folders-info="foldersInfo"
      :is-creating-new-folder="isCreatingNewFolder"
      :is-creating-new-file="isCreatingNewFile"
      :parent-params="parentParams"
      @create-file="onCreateFile"
      @create-folder="onCreateFolder"
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
    params() {
      return this.$route.params
    },

    parentParams() {
      return this.params.pathMatch
    },

    userID() {
      return this.$store.getters["authentication/id"]
    },

    currentUsername() {
      return this.$route.params.username
    },
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
        this.foldersInfo = data
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
        this.foldersInfo.pushPost(data)

        this.triggerCreatingNewFile()
      } catch(e) {
        console.error(e)
      }
    },

    async fetchData() {
      try {
        const { data } = await this.$axios.$get(`/api/v1/folders/${this.parentParams}`)
        this.foldersInfo = data
        this.triggerCreatingNewFolder()
      } catch (e) {
        console.error(e)
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
