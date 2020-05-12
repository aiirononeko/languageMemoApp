<template>
  <one-column-container fluid>
    <v-col class="px-0">
      <select-md-status-btn-group :fileid="fileid" :value="status" />
    </v-col>

    <view-file-card :md="md" />
  </one-column-container>
</template>

<script>
const ViewFileCard = () => import('~/components/organisms/cards/ViewFileCard')
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')
const SelectMdStatusBtnGroup = () => import('~/components/organisms/btnGroup/SelectMdStatusBtnGroup')

export default {
  components: {
    ViewFileCard,
    OneColumnContainer,
    SelectMdStatusBtnGroup
  },

  props: {
    fileid: {
      type: String,
      required: true
    },

    md: {
      type: String,
      default: undefined
    },

    status: {
      type: String,
      defaul: undefined
    }
  }
}
</script>

<style>

</style>
