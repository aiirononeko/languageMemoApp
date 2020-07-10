<template>
  <div>
    <!-- 各ユーザーのsnsへのリンク -->
    <twitter-btn fab v-if="twitterLinkIsExists"/>
    <github-btn fab v-if="githubLinkIsExists"/>
  </div>
</template>

<script>
export default {
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
