<template>
  <div>
    <signup-template
      :errors="errors"
      :success="success"
      :message="message"
      @signup="signup"
    />
  </div>
</template>

<script>
const SignupTemplate = () => import('~/components/templates/SignupTemplate')

export default {
  components: {
    SignupTemplate
  },

  middleware: 'guest',

  data() {
    return {
      errors: null,
      success: false,
      message: null
    }
  },

  methods: {
    async signup(userInfo) {
      try {
        const { success, message } = await this.$axios.$post(`/api/v1/auth`, {
          email: userInfo.email,
          password: userInfo.password
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
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
