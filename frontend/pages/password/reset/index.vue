<template>
  <div>
    <password-reset-index-template :success="success" :message="message" @submit="reset" />
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
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
