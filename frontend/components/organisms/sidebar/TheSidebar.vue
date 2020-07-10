<template>
  <sidebar-container>
    <LoginSidebar v-if="isLogin" />

    <GuestSidebar v-else />
  </sidebar-container>
</template>

<script>
export default {
  computed: {
    isLogin() {
      return this.$store.getters["authentication/isAuthenticated"]
    }
  },
}
</script>

<style>

</style>
