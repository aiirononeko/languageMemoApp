<template>
  <one-column-container>
    <h1 class="main-heading mb-8 text-center">ログイン</h1>

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
