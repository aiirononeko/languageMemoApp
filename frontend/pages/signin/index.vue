<template>
  <div>
    <signin-template @signin="login" />
  </div>
</template>

<script>
const SigninTemplate = () => import('~/components/templates/SigninTemplate')

export default {
  components: {
    SigninTemplate
  },

  middleware: 'guest',

  data() {
    return {
      errors: null
    }
  },

  methods: {
    async login({ email, password }) {
      try {
        await this.$store.dispatch("authentication/login", {
          email, password
        })

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
    }
  },

  head() {
    return {
      title: "ログイン"
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
