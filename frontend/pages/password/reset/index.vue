<template>
  <div>
    <password-reset-index-template
      :errors="errors"
      :success="success"
      :message="message"
      @submit="reset"
    />
  </div>
</template>

<script>
const PasswordResetIndexTemplate = () => import('~/components/templates/PasswordResetIndexTemplate')

export default {
  components: {
    PasswordResetIndexTemplate
  },

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
      try {
        const { success, message } = await this.$axios.$post(`/api/v1/auth/password`, {
          email,
          'redirect_url': `${process.env.clientUrl}/password/reset/confirm`
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
  }
}
</script>

<style lang="scss" scoped>

</style>
