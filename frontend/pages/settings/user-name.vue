<template>
  <div>
    <settings-user-name-template :username="username" @submit="updateUsername"/>
  </div>
</template>

<script>
import SettingsUserNameTemplate from '~/components/templates/SettingsUserNameTemplate'

export default {
  components: {
    SettingsUserNameTemplate
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
