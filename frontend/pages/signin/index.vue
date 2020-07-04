<template>
  <div>
    <signin-template :errors="errors" @signin="login" @snsauth="snsauth" />
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
        const res = await this.$axios.post(`/api/v1/auth/sign_in`, {
          email, password
        })

        this.$store.dispatch("authentication/loginWithEmail", res)

        await this.$router.push(`/settings/profile`)
      } catch (e) {
        if (e.response.status === 401 || e.response.status === 422) {
          this.errors = {
            email: [
              'メールアドレスかパスワードが違います'
            ]
          }
          return
        }

        return this.$nuxt.error({
          statusCode: e.response.status
        })
      }
    },

    async snsauth(provider) {
      // TODO: sns認証の処理を書く

      document.location.href = `${this.$config.baseUrl}/api/v1/auth/${provider}`
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
