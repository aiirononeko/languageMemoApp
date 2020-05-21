<template>
  <div>
    <username-index-template :userInfo="userInfo" />
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

  async asyncData({ $axios, params }) {
    try {
      const { data } = await $axios.$get(`/api/v1/users/2`)
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
