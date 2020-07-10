<template>
  <div>
    <!-- ログインしたユーザーに見せるもの -->
    <header-action-btn v-if="$device.isDesktop" text="ログアウト" @click="logout" />
  </div>
</template>

<script>
export default {
  methods: {
    async logout() {
      try {
        await this.$store.dispatch("authentication/logout")

        await this.$router.push(`/signin`)
      } catch (e) {
        return this.$nuxt.error({
          statusCode: 500
        })
      }
    }
  }
}
</script>
