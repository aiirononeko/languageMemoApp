<template>
  <one-column-container fluid>
    <edit-markdown v-model="md" :preview="preview" />
  </one-column-container>
</template>

<script>
const EditMarkdown = () => import('~/components/organisms/markdown/EditMarkdown')
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')

export default {
  components: {
    EditMarkdown,
    OneColumnContainer
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
    },

    preview: {
      type: Boolean,
      default: true
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
