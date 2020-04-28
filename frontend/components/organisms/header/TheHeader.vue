<template>
  <header-container @click="onClick">
    <v-spacer />

    <keep-alive>
      <component :is="getComponentName" />
    </keep-alive>
  </header-container>
</template>

<script>
const GuestHeader = () => import('~/components/organisms/header/GuestHeader')
import HeaderContainer from '~/components/organisms/header/HeaderContainer'
const LoginHeader = () => import('~/components/organisms/header/LoginHeader')

export default {
  components: {
    GuestHeader,
    HeaderContainer,
    LoginHeader
  },

  computed: {
    getComponentName() {
      return this.isLogin ? 'LoginHeader' : 'GuestHeader'
    },

    isLogin() {
      return this.$store.getters["authentication/isAuthenticated"]
    }
  },

  methods: {
    onClick() {
      return this.$emit('click')
    }
  },
}
</script>

<style>

</style>
