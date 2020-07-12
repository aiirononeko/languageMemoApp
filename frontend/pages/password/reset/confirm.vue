<template>
  <PasswordResetConfirmTemplate
    :errors="errors"
    :success="success"
    :message="message"
    @submit="reset"
  />
</template>

<script>
export default {
  middleware: "guest",

  validate({ query }) {
    return query["access-token"]
      && (query.client || query.client_id)
      && query.reset_password
      && query.token
      && query.uid
  },

  data() {
    return {
      errors: null,
      success: false,
      message: null
    }
  },

  computed: {
    headers() {
      return {
        "access-token": this.$route.query["access-token"],
        client: this.$route.query.client,
        uid: this.$route.query.uid
      }
    }
  },

  methods: {
    async reset({ password, password_confirmation }) {
      this.errors = null

      try {
        const { success, message } = await this.$axios.$put(`/api/v1/auth/password`, {
          password, password_confirmation
        }, {
          headers: this.headers
        })

        this.success = success
        this.message = message
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
      title: "新しいパスワードの入力"
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
