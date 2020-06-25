<template>
  <about-index-template />
</template>

<script>
const AboutIndexTemplate = () => import('~/components/templates/AboutIndexTemplate')

export default {
  components: {
    AboutIndexTemplate
  },

  head() {
    return {
      title: "Poetaについて"
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
