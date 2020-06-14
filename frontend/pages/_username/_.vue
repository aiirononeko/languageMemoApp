<template>
  <!-- マイページの２階層以下 -->
  <div>
    <username-index-template
      :userInfo="userInfo"
      :foldersInfo="foldersInfo"
      :isCreatingNewFolder="isCreatingNewFolder"
      @submit="submit"
      @fetchData="fetchData"
      @triggerIsCreatingNewFolder="triggerIsCreatingNewFolder"
    />
  </div>
</template>

<script>
import UsernameIndexTemplate from '~/components/templates/UsernameIndexTemplate'
import User from '~/types/User'

export default {
  components: {
    UsernameIndexTemplate
  },

  data: () => ({
    isCreatingNewFolder: false
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
    async submit(newFolderName) {
      const folderInfo = {
        name: newFolderName,
        public: false,
        user_id: this.id,
        parent_id: this.parentParams
      }
      try {
        await this.$axios.post(`/api/v1/folders`, folderInfo)
      } catch(e) {
        console.error(e)
      }
      this.fetchData()
    },

    async fetchData() {
      try {
        const { data } = await this.$axios.$get(`/api/v1/folders/${this.parentParams}`)
        this.foldersInfo = data
        this.triggerIsCreatingNewFolder()
      } catch (e) {
        console.error(e)
      }
    },

    triggerIsCreatingNewFolder() {
      this.isCreatingNewFolder = !this.isCreatingNewFolder
    },
  },

  async asyncData({ $axios, params, store }) {
    try {
      const foldersInfo = await $axios.$get(`/api/v1/folders/${params.pathMatch}`)
      const userInfo = await $axios.$get(`/api/v1/users/${params.username}`)
      return { userInfo: new User(userInfo.data), foldersInfo: foldersInfo.data }
    } catch (e) {
      console.error(e)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
