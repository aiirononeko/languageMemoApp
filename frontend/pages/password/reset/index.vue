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

  computed: {
    notFoundErrorObj() {
      return {
        email: [
          'メールアドレスが間違っているかもしれません'
        ]
      }
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
        const statusCode = e.response && e.response.status || 500

        if (statusCode === 404) {
          this.errors = Object.assign({}, this.notFoundErrorObj)
          return
        }

        if (statusCode === 422) {
          this.errors = e.response.data.errors
          return
        }


        return this.$nuxt.error({ statusCode })
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
