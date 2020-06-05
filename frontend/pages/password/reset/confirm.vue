<template>
  <password-reset-confirm-template :success="success" :message="message" @submit="reset" />
</template>

<script>
const PasswordResetConfirmTemplate = () => import('~/components/templates/PasswordResetConfirmTemplate')

export default {
  components: {
    PasswordResetConfirmTemplate
  },

  middleware: "guest",

  data() {
    return {
      success: false,
      message: null
    }
  },

  methods: {
    async reset({ password, password_confirmation }) {
      try {
        const { data } = await this.$axios.$put(`/api/v1/auth/password`, {
          password, password_confirmation
        })

        this.success = data.success
        this.message = data.message
        // this.$router.push(data.redirect_url)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
