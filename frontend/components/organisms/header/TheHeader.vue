<template>
  <HeaderContainer @click="onClick">
    <v-spacer />

    <keep-alive>
      <LoginHeader v-if="isLogin" />

      <GuestHeader v-else />
    </keep-alive>
  </HeaderContainer>
</template>

<script>
export default {
  computed: {
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
