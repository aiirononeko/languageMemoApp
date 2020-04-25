<template>
  <!-- sidebarのroutingのイメージ -->
  <sidebar-container>
    <guest-sidebar v-if="isGuest" />

    <login-sidebar v-if="isLogin" />
  </sidebar-container>
</template>

<script>
import SidebarContainer from '~/components/organisms/sidebar/SidebarContainer'
import GuestSidebar from '~/components/organisms/sidebar/GuestSidebar'
import LoginSidebar from '~/components/organisms/sidebar/LoginSidebar'

export default {
  components: {
    SidebarContainer,
    GuestSidebar,
    LoginSidebar
  },

  computed: {
    isLogin() {
      // TODO: Login済みかどうかの判定
      return false
    },

    isGuest() {
      // TODO: Guestかどうかの判定
      return true
    }
  },
}
</script>

<style>

</style>
