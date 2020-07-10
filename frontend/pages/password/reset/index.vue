<template>
  <PasswordResetIndexTemplate
    :errors="errors"
    :success="success"
    :message="message"
    @submit="reset"
  />
</template>

<script>
export default {
  middleware: "guest",

  data() {
    return {
      errors: null,
      success: false,
      message: null
    }
  },

  methods: {
    async reset(email) {
      this.errors = null

      try {
        const { success, message } = await this.$axios.$post(`/api/v1/auth/password`, {
          email,
          'redirect_url': `${this.$config.clientUrl}/password/reset/confirm`
        })

        this.success = success
        this.message = message
      } catch (e) {
        if (e.response && e.response.status === 404) {
          this.errors = {
            email: [
              'メールアドレスが間違ってるかもしれません'
            ]
          }
          return
        }

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
      title: "パスワードをリセット"
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
