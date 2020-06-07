<template>
  <div>
    <signin-template @signin="login" />
  </div>
</template>

<script>
const SigninTemplate = () => import('~/components/templates/SigninTemplate')

export default {
  components: {
    SigninTemplate
  },

  middleware: 'guest',

  methods: {
    async login({ email, password }) {
      try {
        await this.$store.dispatch("authentication/login", {
          email, password
        })

        this.$router.push(`/settings/profile`)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
