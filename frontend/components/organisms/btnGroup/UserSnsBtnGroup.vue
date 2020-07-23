<template>
  <div>
    <!-- 各ユーザーのsnsへのリンク -->
    <TwitterBtn fab v-if="twitterLinkIsExists" :href="twitterLink" depressed />
    <GithubBtn fab v-if="githubLinkIsExists" :href="githubLink" depressed />
  </div>
</template>

<script>
export default {
  props: {
    twitterLink: {
      type: String,
      default: '',
    },

    githubLink: {
      type: String,
      default: '',
    },
  },

  computed: {
    twitterLinkIsExists() {
      return !!this.twitterLink
    },
    githubLinkIsExists() {
      return !!this.githubLink
    },
  }
}
</script>

<style>
</style>
