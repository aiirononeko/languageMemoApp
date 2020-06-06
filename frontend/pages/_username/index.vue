<template>
  <div>
    <username-index-template :userInfo="userInfo" @submit="submit" />
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
        console.log("onSubmit")
        await this.$axios.post(`/api/v1/folders`, folderInfo)
      } catch(e) {
        console.error(e)
      }
      
    }
  },

  async asyncData({ $axios, params, store }) {
    try {
      // Todo: APIが変更されたら以下のように変更する
      // const { data } = await $axios.$get(`/api/v1/users/#{params}`)

      const { data } = await $axios.$get(`/api/v1/users/${store.getters["authentication/username"]}`)
      return { userInfo: data }
    } catch (e) {
      console.error(e)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
