<template>
  <v-app id="inspire">
    <the-header />

    <the-sidebar />

    <v-card class="overflow-hidden header box-shadow-none">
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
        max-height="100vh"
      >
        <v-content>
          <nuxt />
          <TheFooter v-if="isFooterValidPath" />
        </v-content>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
export default {
  computed: {
    isFooterValidPath() {
      const currentPath = this.$route.name
      return currentPath !== 'username' && currentPath !== 'edit-new'
    }
  }
}
</script>
