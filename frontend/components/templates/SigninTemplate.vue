<template>
  <one-column-container>
    <h1 class="mb-8">ログイン</h1>

    <signin-card />
  </one-column-container>
</template>

<script>
import OneColumnContainer from '~/components/molecules/containers/OneColumnContainer'
import SigninCard from '~/components/organisms/cards/SigninCard'

export default {
  components: {
    OneColumnContainer,
    SigninCard
  }
}
</script>

<style scoped>
  h1 {
    color: #646464;
  }
</style>
