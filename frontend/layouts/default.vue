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
          <Footer v-if="footerValidPath" />
        </v-content>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
export default {
  computed: {
    footerValidPath() {
      const currentPath = this.$route.name
      console.log(currentPath)
      return currentPath !== 'username' && currentPath !== 'edit-new'
    }
  }
}
</script>
