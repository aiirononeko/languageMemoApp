<template>
  <one-column-container>
    <h1 class="mb-7 text-center">新規登録</h1>

    <signup-card @signup="signup" />
  </one-column-container>
</template>

<script>
import OneColumnContainer from '~/components/molecules/containers/OneColumnContainer'
import SignupCard from '~/components/organisms/cards/SignupCard'

export default {
  components: {
    OneColumnContainer,
    SignupCard
  },

  methods: {
    signup(userInfo) {
      this.$emit('signup', userInfo)
    }
  }
}
</script>

<style>
</style>
