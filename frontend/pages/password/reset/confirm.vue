<template>
  <password-reset-confirm-template @submit="reset" />
</template>

<script>
const PasswordResetConfirmTemplate = () => import('~/components/templates/PasswordResetConfirmTemplate')

export default {
  components: {
    PasswordResetConfirmTemplate
  },

  methods: {
    reset({ password, password_confirmation }) {
      try {
        const { data } = this.$axios.$put(`/api/v1/auth/password`, {
          password, password_confirmation
        })

        this.$router.push(data.redirect_url)
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
