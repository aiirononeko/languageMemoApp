<template>
  <div>
    <span v-for="breadCrumb in breadCrumbs" :key="breadCrumb.to">
      /
      <nuxt-link v-if="breadCrumb.isRepo" :to="`/${breadCrumb.to}`">{{ breadCrumb.name }}</nuxt-link>
      <nuxt-link v-else :to="`/${currentUsername}/${breadCrumb.to}`">{{ breadCrumb.name }}</nuxt-link>
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
    
    currentUsername: {
      type: String,
      default: ""
    },

    currentFolderName: {
      type: String,
      default: ""
    }
  },
}
</script>

<style>

</style>
