<template>
  <SettingsUserNameTemplate
    :errors="errors"
    :username="username"
    :is-first-time-login="isFirstTimeLogin"
    @submit="updateUsername"
  />
</template>

<script>
import User from '@/types/User'

export default {
  middleware: "authenticated",

  data() {
    return {
      errors: null
    }
  },

  computed: {
    username() {
      return this.$store.getters["authentication/username"]
    },

    /**
     * 初めてのログインか
     */
    isFirstTimeLogin() {
      return this.queryType === 'new'
    },

    queryType() {
      return this.$route.query.type
    }
  },

  methods: {
    async updateUsername(username) {
      this.errors = null

      try {
        const { data } = await this.$axios.$put(`/api/v1/auth`, {
          username
        })

        const user = new User(data)
        this.$store.dispatch("authentication/updateUsername", user.username)

        await this.$router.push(`/settings/profile`)
      } catch (e) {
        const statusCode = e.response && e.response.status || 500

        if (statusCode === 422) {
          this.errors = e.response.data.errors
          return
        }


        return this.$nuxt.error({ statusCode })
      }
    },
  },

  head() {
    return {
      title: "ユーザー名編集"
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
