<template>
  <settings-deactivate-template
    :success="success"
    :message="message"
    @deactivate="onDeactivate"
  />
</template>

<script>
const SettingsDeactivateTemplate = () => import('~/components/templates/SettingsDeactivateTemplate')

export default {
  components: {
    SettingsDeactivateTemplate
  },

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
}
</script>
