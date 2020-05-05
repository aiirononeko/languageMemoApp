<template>
  <view-file-card :md="md" />
</template>

<script>
const ViewFileCard = () => import('~/components/organisms/cards/ViewFileCard')

export default {
  components: {
    ViewFileCard
  },

  props: {
    md: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style>

</style>
