<template>
  <two-column-container justify="center" :leftCols="6" :rightCols="6" >
    <template #left>
      <edit-markdown v-model="md" />
    </template>

    <template #right>
      <view-file-card :md="md" />

      <blue-btn />
    </template>
  </two-column-container>
</template>

<script>
const BlueBtn = () => import('~/components/atoms/btns/BlueBtn')
const EditMarkdown = () => import('~/components/organisms/markdown/EditMarkdown')
const TwoColumnContainer = () => import('~/components/molecules/containers/TwoColumnContainer')
const ViewFileCard = () => import('~/components/organisms/cards/ViewFileCard')

export default {
  components: {
    BlueBtn,
    EditMarkdown,
    TwoColumnContainer,
    ViewFileCard
  },

  props: {
    value: {
      type: String,
      default: undefined
    }
  },

  computed: {
    md: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit('input', newVal)
      }
    }
  },
}
</script>

<style>

</style>
