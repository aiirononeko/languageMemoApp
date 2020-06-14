<template>
  <div>
    <signin-template @signin="login" :errors="errors" />
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
      this.errors = null // 前回取得したerrorの削除

      try {
        await this.$store.dispatch("authentication/login", {
          email, password
        })

        await this.$router.push(`/settings/profile`)
      } catch (e) {
        if (e === 401 || e === 422) {
          this.errors = {
            email: 'メールアドレスかパスワードが違います'
          }
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
