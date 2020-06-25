<template>
  <!-- マイページのルート -->
  <div>
    <username-index-template
      :current-username="currentUsername"
      :user-info="userInfo"
      :is-creating-new-folder="isCreatingNewFolder"
      :is-creating-new-file="isCreatingNewFile"
      @create-file="onCreateFile"
      @create-folder="onCreateFolder"
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
        parent_id: null
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/folders`, folderInfo)

        // 既存の配列を更新
        this.userInfo.pushFolder(data)

        this.triggerCreatingNewFolder()
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
        this.userInfo.pushPost(data)

        this.triggerCreatingNewFile()
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
      if (e.response && e.response.status) {
        return error({
          statusCode: e.response.status
        })
      }

      return error({
        statusCode: 500
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
