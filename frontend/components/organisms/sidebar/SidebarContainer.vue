<template>
  <v-navigation-drawer v-model="drawer" app clipped>
    <slot />
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.getDrawer
      },
      set(newVal) {
        if (this.getDrawer !== newVal) {
          this.$store.commit('sidebar/onDrawer', newVal)
        }
      }
    },

    getDrawer() {
      return this.$store.getters["sidebar/drawer"]
    }
  },
}
</script>
