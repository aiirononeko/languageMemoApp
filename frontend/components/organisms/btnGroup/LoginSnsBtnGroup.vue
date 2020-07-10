<template>
  <div class="d-flex flex-column">
    <twitter-btn class="mb-4" @click="onClick('twitter')">Twitter</twitter-btn>
    <google-btn class="mb-4" @click="onClick('google_oauth2')">Google</google-btn>
    <github-btn @click="onClick('github')">Github</github-btn>
  </div>
</template>

<script>
export default {
  methods: {
    onClick(value) {
      return this.$emit('snsauth', value)
    }
  },
}
</script>

<style>
  .v-icon {
    margin-right: 4px;
  }
</style>
