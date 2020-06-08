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
    },

    id() {
      return this.$store.getters["authentication/id"]
    },
  },

  methods: {
    async submit(newFolderName) {
      let folderInfo = {
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
        const data = this.$store.getters["authentication/userInfo"]
        this.userInfo = data
      } catch (e) {
        console.error(e)
      }
    }
  },

  async asyncData({ store }) {
    try {
      const userInfo = await store.getters["authentication/userInfo"]
      return { userInfo }
    } catch (e) {
      console.error(e)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
