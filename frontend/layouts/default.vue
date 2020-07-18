<template>
  <v-app id="inspire">
    <TheHeader />

    <TheSidebar />

    <v-content>
      <nuxt />
    </v-content>

    <TheFooter v-if="isFooterValidPath" />
  </v-app>
</template>

<script>
export default {
  computed: {
    isFooterValidPath() {
      const currentPath = this.$route.name
      return currentPath !== 'edit-new'
    }
  }
}
</script>
