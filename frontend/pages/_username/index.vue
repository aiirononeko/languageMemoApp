<template>
  <!-- マイページのルート -->
  <div>
    <UsernameFolderTemplate
      :can-action="canAction"
      :current-path="currentPath"
      :current-username="currentUsername"
      :user-info="userInfo"
      :is-creating-new-folder="isCreatingNewFolder"
      :is-creating-new-post="isCreatingNewPost"
      @create-post="onCreatePost"
      @create-folder="onCreateFolder"
      @change-post-name="onChangeFileName"
      @change-folder-name="onChangeFolderName"
      @delete-post="onDeletePost"
      @delete-folder="onDeleteFolder"
      @trigger-creating-new-folder="triggerCreatingNewFolder"
      @trigger-creating-new-post="triggerCreatingNewPost"
    />
  </div>
</template>

<script>
import User from '@/types/User'

export default {
  validate({ params, query, store }) {
    return User.isValidUsername(params.username)
  },

  data: () => ({
    /** 新しいフォルダーを作成中かどうか */
    isCreatingNewFolder: false,
    /** 新しいファイルを作成中かどうか */
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

    currentPath() {
      return this.$route.path
    },

    currentName() {
      return this.userInfo && this.userInfo.name || this.currentUsername
    },

    currentUsername() {
      return this.$route.params.username
    },

    isAuthenticated() {
      return this.$store.getters["authentication/isAuthenticated"]
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
        parent_id: null
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/folders`, folderInfo)

        // 「新しいFolderを作成中」のアイコンを非表示
        this.isCreatingNewFolder = false
        // 既存の配列を更新
        this.userInfo = User.pushFolder(this.userInfo, data)
      } catch(e) {
        console.error(e)
      }
    },

    async onCreatePost(newPostName) {
      const postsInfo = {
        name: newPostName,
        content: newPostName,
        public: false,
        user_id: this.userID,
        folder_id: null
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/posts`, postsInfo)

        // 「新しいPostを作成中」のアイコンを非表示
        this.isCreatingNewPost = false
        // 既存のデータを更新
        this.userInfo = User.pushPost(this.userInfo, data)
      } catch(e) {
        console.error(e)
      }
    },

    async onChangeFileName({ id, name }) {
      try {
        const { data } = await this.$axios.$put(`/api/v1/posts/${id}`, {
          name
        })

        this.userInfo = User.updatePost(this.userInfo, id, data)
      } catch (e) {
        console.error(e)
      }
    },

    async onChangeFolderName({ id, name }) {
      try {
        const { data } = await this.$axios.$put(`/api/v1/folders/${id}`, {
          name
        })

        this.userInfo = User.updateFolder(this.userInfo, id, data)
      } catch (e) {
        console.error(e)
      }
    },

    async onDeletePost({ id }) {
      try {
        await this.$axios.$delete(`/api/v1/posts/${id}`)

        this.userInfo = User.deletePost(this.userInfo, id)
      } catch (e) {
        console.error(e)
      }
    },

    async onDeleteFolder({ id }) {
      try {
        await this.$axios.$delete(`/api/v1/folders/${id}`)

        this.userInfo = User.deleteFolder(this.userInfo, id)
      } catch (e) {
        console.error(e)
      }
    },

    triggerCreatingNewFolder() {
      this.isCreatingNewFolder = !this.isCreatingNewFolder
    },

    triggerCreatingNewPost() {
      this.isCreatingNewPost = !this.isCreatingNewPost
    }
  },

  async asyncData({ $axios, params, store, error }) {
    try {
      const { data } = await $axios.$get(`/api/v1/users/${params.username}`)

      return { userInfo: new User(data) }
    } catch (e) {
      const statusCode = e.response && e.response.status || 500

      return error({ statusCode })
    }
  },

  head() {
    return {
      title: this.currentName
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
