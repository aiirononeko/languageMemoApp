<template>
  <!-- マイページのルート -->
  <div>
    <username-index-template 
      :userInfo="userInfo" 
      :isCreatingNewFolder="isCreatingNewFolder"
      @submit="submit" 
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
    id() {
      return this.$store.getters["authentication/id"]
    },

    params() {
      return this.$route.params
    }
  },

  methods: {
    async submit(newFolderName) {
      const folderInfo = {
        name: newFolderName,
        public: false,
        user_id: this.id,
        parent_id: null 
      }
      try {
        await this.$axios.post(`/api/v1/folders`, folderInfo)
        await this.$store.dispatch("authentication/fetchUser")
      } catch(e) {
        console.error(e)
      }
      this.fetchData()
    },

     async fetchData() {
      try {
        const { data } = await this.$axios.$get(`/api/v1/users/${this.params.username}`)
        this.userInfo = new User(data)
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
      const { data } = await $axios.$get(`/api/v1/users/${params.username}`)
      return { userInfo: new User(data) }
    } catch (e) {
      console.error(e)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
