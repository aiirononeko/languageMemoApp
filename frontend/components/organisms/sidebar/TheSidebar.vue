<template>
  <SidebarContainer>
    <LoginSidebar v-if="isLogin" />

    <GuestSidebar v-else />
  </SidebarContainer>
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
