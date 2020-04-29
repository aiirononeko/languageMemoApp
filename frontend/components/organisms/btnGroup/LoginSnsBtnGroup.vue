<template>
  <div>
    <twitter-btn>Twitter</twitter-btn> 
    <google-btn>Google</google-btn>
    <github-btn>Github</github-btn>
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
