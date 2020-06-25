<template>
  <!-- マイページの２階層以下 -->
  <div>
    <username-index-template
      :user-info="userInfo"
      :folders-info="foldersInfo"
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
    params() {
      return this.$route.params
    },

    parentParams() {
      return this.params.pathMatch
    },

    id() {
      return this.$store.getters["authentication/id"]
    }
  },

  methods: {
    async onCreateFolder(newFolderName) {
      const folderInfo = {
        name: newFolderName,
        public: false,
        user_id: this.id,
        parent_id: this.parentParams
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

    async onCreateFile(newFolderName) {
        this.triggerCreatingNewFile()
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
    try {
      const userInfo = await $axios.$get(`/api/v1/users/${params.username}`)
      const foldersInfo = await $axios.$get(`/api/v1/folders/${params.pathMatch}`)
      return { userInfo: new User(userInfo.data), foldersInfo: foldersInfo.data }
    } catch (e) {
      return error({
        statusCode: e.response.status
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
