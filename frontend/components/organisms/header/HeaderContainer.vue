<template>
  <v-app-bar app clipped-left color="amber lighten-2" dense fixed>
    <v-app-bar-nav-icon @click="onClick()"  />

    <v-toolbar-title>
      <nuxt-link to="/" class="text--secondary text-decoration-none">
        <header-title-text :elment="getTitleElement" :text="siteTitle" />
      </nuxt-link>
    </v-toolbar-title>

    <!-- headerのcontainer -->
    <slot />
  </v-app-bar>
</template>

<script>
const SITE_TITLE = 'poeta'

export default {
  methods: {
    onClick() {
      this.$store.commit('sidebar/onDrawer')
    }
  },

  computed: {
    getTitleElement() {
      return this.$route.path === '/' ? 'h1' : 'p'
    },

    siteTitle: () => SITE_TITLE
  },
}
</script>


