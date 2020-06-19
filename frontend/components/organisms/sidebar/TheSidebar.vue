<template>
  <sidebar-container>
    <component :is="getComponentName" />
  </sidebar-container>
</template>

<script>
const SidebarContainer = () => import('~/components/organisms/sidebar/SidebarContainer')
const GuestSidebar = () => import('~/components/organisms/sidebar/GuestSidebar')
const LoginSidebar = () => import('~/components/organisms/sidebar/LoginSidebar')

export default {
  components: {
    SidebarContainer,
    GuestSidebar,
    LoginSidebar
  },

  computed: {
    getComponentName() {
      return this.isLogin ? 'LoginSidebar' : 'GuestSidebar'
    },

    isLogin() {
      return this.$store.getters["authentication/isAuthenticated"]
    }
  },
}
</script>

<style>

</style>
