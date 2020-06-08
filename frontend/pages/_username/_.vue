<template>
  <div>
    <username-index-template 
      :userInfo="userInfo" 
      :foldersInfo="foldersInfo" 
      @submit="submit" 
      @fetchData="fetchData" 
    />
  </div>
</template>

<script>
import UsernameIndexTemplate from '~/components/templates/UsernameIndexTemplate'

export default {
  components: {
    UsernameIndexTemplate
  },

  computed: {
    username() {
      return this.$route.params.username
    },

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
      let folderInfo = {
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
      } catch (e) {
        console.error(e)
      }
    }
  },

  async asyncData({ $axios, params, store }) {
    try {
      const { data } = await $axios.$get(`/api/v1/folders/${params.pathMatch}`)
      const userInfo = store.getters["authentication/userInfo"]
      return { userInfo, foldersInfo: data }
    } catch (e) {
      console.error(e)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
