<template>
  <div>
    <!-- 各ユーザーのsnsへのリンク -->
    <twitter-btn fab :v-if="twitterLinkIsExists"/>
    <github-btn fab :v-if="githubLinkIsExists"/>
  </div>
</template>

<script>
const TwitterBtn = () => import('~/components/molecules/btns/TwitterBtn')
const GithubBtn = () => import('~/components/molecules/btns/GithubBtn')

export default {
  components: {
    TwitterBtn,
    GithubBtn
  },

  computed: {
    twitterLinkIsExists() {
      // TODO(Ropital): Twitterリンクが存在したらtrueを返す
      return false
    },
    githubLinkIsExists() {
      // TODO(Ropital): Githubリンクが存在したらtrueを返す
      return false
    },
  }
}
</script>

<style>
</style>
