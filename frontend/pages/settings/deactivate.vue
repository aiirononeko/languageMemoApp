<template>
  <SettingsDeactivateTemplate
    :success="success"
    :message="message"
    @deactivate="onDeactivate"
  />
</template>

<script>
export default {
  middleware: "authenticated",

  data() {
    return {
      success: false,
      message: null
    }
  },

  methods: {
    async onDeactivate() {
      try {
        const { message } = await this.$store.dispatch("authentication/deactivate")

        this.message = message
        this.success = true
      } catch (e) {
        return this.$nuxt.error({
          statusCode: 500
        })
      }
    }
  },

  head() {
    return {
      title: "アカウント削除"
    }
  }
}
</script>
