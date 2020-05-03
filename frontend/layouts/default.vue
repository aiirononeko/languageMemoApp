<template>
  <v-app id="inspire">
    <the-header @click="onDrawer()" />

    <the-sidebar :drawer="drawer" />

    <v-card class="overflow-hidden header">
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
        max-height="100vh"
      >
        <v-content>
          <nuxt />
        </v-content>
      </v-sheet>
    </v-card>
  </v-app>
</template>

<script>
import TheHeader from '~/components/organisms/header/TheHeader'
const TheSidebar = () => import('~/components/organisms/sidebar/TheSidebar')

export default {
  components: {
    TheHeader,
    TheSidebar
  },

  data: () => ({
    drawer: true
  }),

  methods: {
    onDrawer() {
      this.drawer = !this.drawer
    }
  }
}
</script>
