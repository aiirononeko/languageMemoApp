<template>
  <!-- マイページのルート -->
  <div>
    <username-index-template :userInfo="userInfo" @submit="submit" @fetchData="fetchData" />
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
    }
  },

  methods: {
    async submit(newFolderName) {
      let folderInfo = {
        name: newFolderName,
        public: false,
        user_id: this.$store.getters["authentication/id"],
        parent_id: null 
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
        const { data } = await this.$axios.$get(`/api/v1/users/${this.$store.getters["authentication/username"]}`)
        this.userInfo = data
      } catch (e) {
        console.error(e)
      }
    }
  },

  async asyncData({ $axios, params, store }) {
    try {
      const { data } = await $axios.$get(`/api/v1/users/${store.getters["authentication/username"]}`)
      console.log(data)
      return { userInfo: data }
    } catch (e) {
      console.error(e)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
