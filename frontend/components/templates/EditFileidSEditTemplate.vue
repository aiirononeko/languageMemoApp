<template>
  <one-column-container fluid>
    <v-col class="px-0">
      <select-md-status-btn-group :fileid="fileid" :value="status" />
    </v-col>

    <edit-markdown v-model="md" />
  </one-column-container>
</template>

<script>
const EditMarkdown = () => import('~/components/organisms/markdown/EditMarkdown')
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')
const SelectMdStatusBtnGroup = () => import('~/components/organisms/btnGroup/SelectMdStatusBtnGroup')

export default {
  components: {
    EditMarkdown,
    OneColumnContainer,
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
