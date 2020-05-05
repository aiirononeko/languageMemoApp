<template>
  <one-column-container>
    <edit-markdown v-model="md" />
  </one-column-container>
</template>

<script>
const EditMarkdown = () => '~/components/organisms/markdown/EditMarkdown'
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')

export default {
  components: {
    EditMarkdown,
    OneColumnContainer
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
