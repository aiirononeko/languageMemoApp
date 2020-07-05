<template>
  <div>
    <signup-template
      :errors="errors"
      :success="success"
      :message="message"
      @signup="signup"
      @snsauth="snsauth"
    />
  </div>
</template>

<script>
const SignupTemplate = () => import('~/components/templates/SignupTemplate')

export default {
  components: {
    SignupTemplate
  },

  middleware: 'guest',

  data() {
    return {
      errors: null,
      success: false,
      message: null
    }
  },

  methods: {
    async signup(userInfo) {
      this.errors = null // 前回取得したerrorの削除

      try {
        await this.$axios.$post(`/api/v1/auth`, {
          email: userInfo.email,
          password: userInfo.password
        })

        this.success = true
        this.message = "新規登録ありがとうございます。登録したメールアドレスを確認してください"
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

    async snsauth(provider) {
      document.location.href = `${process.env.baseUrl}/api/v1/auth/${provider}`
    }
  },

  head() {
    return {
      title: "新規登録"
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
