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

        this.$store.dispatch("authentication/login", res)

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
