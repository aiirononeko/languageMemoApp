<template>
  <div class="d-flex flex-column">
    <twitter-btn class="mb-4" to="#">Twitter</twitter-btn> 
    <google-btn class="mb-4" to="#">Google</google-btn>
    <github-btn to="#">Github</github-btn>
  </div>
</template>

<script>
import TwitterBtn from '~/components/molecules/btns/TwitterBtn'
import GoogleBtn from '~/components/molecules/btns/GoogleBtn'
import GithubBtn from '~/components/molecules/btns/GithubBtn'

export default {
  components: {
    TwitterBtn,
    GoogleBtn,
    GithubBtn
  }
}
</script>

<style>
</style>
