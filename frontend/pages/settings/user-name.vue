<template>
  <div>
    <settings-user-name-template
      :errors="errors"
      :username="username"
      @submit="updateUsername"
    />
  </div>
</template>

<script>
import SettingsUserNameTemplate from '~/components/templates/SettingsUserNameTemplate'
import User from '~/types/User'

export default {
  components: {
    SettingsUserNameTemplate
  },

  middleware: "authenticated",

  data() {
    return {
      errors: null
    }
  },

  computed: {
    username() {
      return this.$store.getters["authentication/username"]
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
        if (e.response && e.response.status === 422) {
          this.errors = e.response.data.errors
          return
        }

        return this.$nuxt.error({
          statusCode: e.response.status
        })
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
