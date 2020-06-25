<template>
  <!-- マイページのルート -->
  <div>
    <username-index-template
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
    id() {
      return this.$store.getters["authentication/id"]
    },

    params() {
      return this.$route.params
    }
  },

  methods: {
    async onCreateFolder(newFolderName) {
      const folderInfo = {
        name: newFolderName,
        public: false,
        user_id: this.id,
        parent_id: null
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/folders`, folderInfo)

        this.userInfo.folders.push({
          created_at: data.attributes["created-at"],
          id: data.id,
          name: data.attributes.name,
          parent_id: null,
          public: data.attributes.public,
          updated_at: data.attributes["updated-at"],
          user_id: data.attributes["user-id"]
        })
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
        user_id: this.id,
        folder_id: null
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/posts`, postsInfo)

        this.userInfo.posts.push({
          created_at: data.attributes["created-at"],
          content: data.attributes.content,
          id: data.id,
          name: data.attributes.name,
          parent_id: null,
          public: data.attributes.public,
          updated_at: data.attributes["updated-at"],
          user_id: data.attributes["user-id"]
        })
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
      error({
        statusCode: e.response.status
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
