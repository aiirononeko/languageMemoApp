<template>
  <password-reset-index-template @submit="reset" />
</template>

<script>
const PasswordResetIndexTemplate = () => import('~/components/templates/PasswordResetIndexTemplate')

export default {
  components: {
    PasswordResetIndexTemplate
  },

  methods: {
    reset(email) {
      try {
        const { data } = this.$axios.$post(`/api/v1/auth/password`, {
          email,
          'redirect_url': `${process.env.clientUrl}/password/reset/confirm`
        })

        this.$router.push(data.redirect_url)
      } catch (e) {}
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
