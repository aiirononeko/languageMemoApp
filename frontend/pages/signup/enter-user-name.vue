<template>
  <div>
    <signin-enterusername-template :username="username" @submit="updateUsername"/>
  </div>
</template>

<script>
import SigninEnterusernameTemplate from '~/components/templates/SigninEnterusernameTemplate'

export default {
  components: {
    SigninEnterusernameTemplate
  },

  middleware: "authenticated",

  computed: {
    username() {
      return this.$store.getters["authentication/username"]
    }
  },

  methods: {
    async updateUsername(userName) {
      try {
        await this.$store.dispatch("authentication/updateUsername", userName)

        this.$router.push(`/settings/profile`)
      } catch (error) {
        console.error(error)
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
