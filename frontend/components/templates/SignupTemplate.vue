<template>
  <one-column-container>
    <h1>新規登録</h1>

    <signup-card />
  </one-column-container>
</template>

<script>
import OneColumnContainer from '~/components/molecules/containers/OneColumnContainer'
import SignupCard from '~/components/organisms/cards/SignupCard'

export default {
  components: {
    OneColumnContainer,
    SignupCard
  }
}
</script>

<style>

</style>
