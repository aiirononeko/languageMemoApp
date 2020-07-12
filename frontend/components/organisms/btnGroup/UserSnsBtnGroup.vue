<template>
  <div>
    <!-- 各ユーザーのsnsへのリンク -->
    <TwitterBtn fab v-if="twitterLinkIsExists"/>
    <GithubBtn fab v-if="githubLinkIsExists"/>
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
