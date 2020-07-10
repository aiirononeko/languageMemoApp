<template>
  <div>
    <signin-template :errors="errors" @signin="login" @snsauth="snsauth" />
  </div>
</template>

<script>
export default {
  middleware: 'guest',

  data() {
    return {
      errors: null
    }
  },

  computed: {
    redirectPath() {
      return (username) => {
        if (this.isFirstTimeLogin) {
          return {
            path: '/settings/user-name',
            query: {
              type: 'new'
            }
          }
        }

        return username ?  `/${username}` : `/settings/profile`
      }
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
    async login({ email, password }) {
      this.errors = null // 前回取得したerrorの削除

      try {
        const res = await this.$axios.post(`/api/v1/auth/sign_in`, {
          email, password
        })

        this.$store.dispatch("authentication/loginWithEmail", res)

        await this.$router.push(
          this.redirectPath(this.$store.getters["authentication/username"])
        )
      } catch (e) {
        const status = e.response && e.response.status || 500

        if (status === 401 || status === 422) {
          this.errors = {
            email: [
              'メールアドレスかパスワードが違います'
            ]
          }
          return
        }

        return this.$nuxt.error({
          statusCode: status
        })
      }
    },

    async snsauth(provider) {
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
