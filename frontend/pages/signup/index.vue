<template>
  <div>
    <signup-template @signup="signup" />
  </div>
</template>

<script>
import SignupTemplate from '~/components/templates/SignupTemplate'

export default {
  components: {
    SignupTemplate
  },

  methods: {
    async signup(userInfo) {
      try {
        console.log("singup")
        await this.$axios.post(`/api/v1/auth`, {
          email: userInfo.email,
          password: userInfo.password
        })

        this.$router.push(`/user/confirm`)
      } catch (error) {
        console.error(error)
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
