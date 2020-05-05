<template>
  <one-column-container>
    <view-file-card :md="md" />
  </one-column-container>
</template>

<script>
const ViewFileCard = () => import('~/components/organisms/cards/ViewFileCard')
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')

export default {
  components: {
    ViewFileCard,
    OneColumnContainer
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
