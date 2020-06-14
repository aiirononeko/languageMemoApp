<template>
  <div>
    <span v-for="breadCrumb in breadCrumbs" :key="breadCrumb.to">
      /
      <nuxt-link :to="getBreadCrumbs(breadCrumb.to, breadCrumb.isRepo)">{{ breadCrumb.name }}</nuxt-link>
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
  
  computed: {
    getBreadCrumbs() {
      return function(to, isRepo) {
        if(isRepo) {
          return `/${this.currentUsername}`
        }else {
          return `/${this.currentUsername}/${to}`
        }
      }
    }
  }
}
</script>

<style>

</style>
