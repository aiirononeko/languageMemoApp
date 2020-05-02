<template>
  <div class="d-flex flex-column">
    <twitter-btn class="mb-4" to="#">Twitter</twitter-btn> 
    <google-btn class="mb-4" to="#">Google</google-btn>
    <github-btn to="#">Github</github-btn>
  </div>
</template>

<script>
const TwitterBtn = () => import('~/components/molecules/btns/TwitterBtn')
const GoogleBtn = () => import('~/components/molecules/btns/GoogleBtn')
const GithubBtn = () => import('~/components/molecules/btns/GithubBtn')

export default {
  components: {
    TwitterBtn,
    GoogleBtn,
    GithubBtn
  }
}
</script>

<style>
  .v-icon {
    margin-right: 4px;
  }
</style>
