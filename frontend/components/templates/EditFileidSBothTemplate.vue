<template>
  <two-column-container justify="center" :leftCols="6" :rightCols="6" >
    <template #left>
      <select-md-status-btn-group :fileid="fileid" :value="status" />

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
const SelectMdStatusBtnGroup = () => import('~/components/organisms/btnGroup/SelectMdStatusBtnGroup')

export default {
  components: {
    BlueBtn,
    EditMarkdown,
    TwoColumnContainer,
    ViewFileCard,
    SelectMdStatusBtnGroup
  },

  props: {
    fileid: {
      type: String,
      required: true
    },

    value: {
      type: String,
      default: undefined
    },

    status: {
      type: String,
      defaul: undefined
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
  }
}
</script>

<style>

</style>
