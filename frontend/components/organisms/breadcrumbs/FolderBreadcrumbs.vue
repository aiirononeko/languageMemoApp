<template>
  <div>
    <span v-for="(breadCrumb, key) in breadCrumbs" :key="key">
      /
      <nuxt-link :to="breadCrumb.to">{{ breadCrumb.name }}</nuxt-link>
    </span>
    <span v-if="currentFolderName">/{{ currentFolderName }}</span>
  </div>
</template>

<script>
export default {
  props: {
    breadCrumbs: {
      type: Array,
      default: () => []
    },

    currentFolderName: {
      type: String,
      default: ""
    }
  }
}
</script>

<style>

</style>
