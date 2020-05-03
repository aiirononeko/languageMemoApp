<template>
  <sidebar-container v-model="drawer">
    <keep-alive>
      <component :is="getComponentName" />
    </keep-alive>
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

  props: {
    drawer: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    getComponentName() {
      return this.isLogin ? 'LoginSidebar' : 'GuestSidebar'
    },

    isLogin() {
      return this.$store.getters["authentication/isAuthenticated"]
    },

    onInput(newVal) {
      return this.$emit('input', newVal)
    }
  },
}
</script>

<style>

</style>
