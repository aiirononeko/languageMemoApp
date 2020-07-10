<template>
  <div class="d-flex flex-column">
    <TwitterBtn class="mb-4" @click="onClick('twitter')">Twitter</TwitterBtn>
    <GoogleBtn class="mb-4" @click="onClick('google_oauth2')">Google</GoogleBtn>
    <GithubBtn @click="onClick('github')">Github</GithubBtn>
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
