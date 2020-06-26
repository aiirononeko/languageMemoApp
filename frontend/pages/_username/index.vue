<template>
  <!-- マイページのルート -->
  <div>
    <username-index-template
      :can-action="canAction"
      :current-path="currentPath"
      :current-username="currentUsername"
      :user-info="userInfo"
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

    currentPath() {
      return this.$route.path
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

        // 既存の配列を更新
        this.userInfo = User.pushFolder(this.userInfo, data)

        this.isCreatingNewFolder = false
      } catch(e) {
        console.error(e)
      }
    },

    async onCreateFile(newFileName) {
      const postsInfo = {
        name: newFileName,
        content: newFileName,
        public: false,
        user_id: this.userID,
        folder_id: null
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/posts`, postsInfo)

        // 既存のデータを更新
        this.userInfo = User.pushPost(this.userInfo, data)

        this.isCreatingNewFile = false
      } catch(e) {
        console.error(e)
      }
    },

    async fetchData() {
      try {
        const { data } = await this.$axios.$get(`/api/v1/users/${this.params.username}`)
        this.userInfo = new User(data)
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

        this.userInfo = User.updatePost(this.userInfo, id, data)
      } catch (e) {
        console.log(e)
      }
    },

    async onChangeFolderName({ id, name }) {
      try {
        const { data } = await this.$axios.$put(`/api/v1/folders/${id}`, {
          name
        })

        this.userInfo = User.updateFolder(this.userInfo, id, data)
      } catch (e) {
        console.log(e)
      }
    },

    async onDeleteFile({ id }) {
      try {
        await this.$axios.$delete(`/api/v1/posts/${id}`)

        this.userInfo = User.deletePost(this.userInfo, id)
      } catch (e) {
        console.log(e)
      }
    },

    async onDeleteFolder({ id }) {
      try {
        await this.$axios.$delete(`/api/v1/folders/${id}`)

        this.userInfo = User.deleteFolder(this.userInfo, id)
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
    try {
      const { data } = await $axios.$get(`/api/v1/users/${params.username}`)

      return { userInfo: new User(data) }
    } catch (e) {
      const statusCode = e.response && e.response.status || 500

      return error({
        statusCode: statusCode
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
