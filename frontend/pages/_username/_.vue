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
      :is-creating-new-post="isCreatingNewPost"
      @create-folder="onCreateFolder"
      @create-post="onCreatePost"
      @change-folder-name="onChangeFolderName"
      @change-post-name="onChangeFileName"
      @delete-folder="onDeleteFolder"
      @delete-post="onDeletePost"
      @trigger-creating-new-folder="triggerCreatingNewFolder"
      @trigger-creating-new-post="triggerCreatingNewPost"
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

  middleware ({ params, error })  {
    const folderID = getDirname(params.pathMatch) // 現在アクセスしているフォルダーのID

    // 有効なフォルダーIDかどうか
    if (!Folder.isValidFolderID(folderID)) {
      return error({
        statusCode: 404
      })
    }

    const ancestorFolderIDs = pathToArr(params.pathMatch)
    if (ancestorFolderIDs.length === 1 && ancestorFolderIDs[0] === '.') {
      return
    }

    if (ancestorFolderIDs.some((v) => !Folder.isValidFolderID(v))) {
      return error({
        statusCode: 404
      })
    }
  },

  data: () => ({
    isCreatingNewFolder: false,
    isCreatingNewPost: false,
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

    async onCreatePost(newPostName) {
      const postsInfo = {
        name: newPostName,
        content: newPostName,
        public: false,
        user_id: this.userID,
        folder_id:  this.foldersInfo.id
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/posts`, postsInfo)

        // 既存の配列を更新
        this.foldersInfo = Folder.pushPost(this.foldersInfo, data)

        this.triggerCreatingNewPost()
      } catch(e) {
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

    async onDeletePost({ id }) {
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

    triggerCreatingNewPost() {
      this.isCreatingNewPost = !this.isCreatingNewPost
    }
  },

  async asyncData({ $axios, params, error }) {
    const folderID = getDirname(params.pathMatch) // 現在アクセスしているフォルダーのID
    const ancestorFolderIDs = pathToArr(params.pathMatch)
    let userInfo, foldersInfo

    try {
      const apiUserInfo = await $axios.$get(`/api/v1/users/${params.username}`)
      const apiFoldersInfo = await $axios.$get(`/api/v1/folders/${folderID}`)

      /** @type {User} userInfo */
      userInfo = new User(apiUserInfo.data)
      /** @type {Folder} foldersInfo */
      foldersInfo = new Folder(apiFoldersInfo.data)
    } catch (e) {
      const statusCode = e.response && e.response.status || 500

      return error({
        statusCode: statusCode
      })
    }

    for (const ancestorFolders of foldersInfo.ancestorFolders) {
      const ancestorFolderID = ancestorFolderIDs.pop() // パスのファイルIDの末尾取り出し
      if (!Folder.isEqualFolderID(ancestorFolders, ancestorFolderID)) {
        return error({
          statusCode: 404
        })
      }
    }

    return { userInfo, foldersInfo }
  },
}
</script>

<style lang="scss" scoped>

</style>
