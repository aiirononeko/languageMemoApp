<template>
  <div>
    <base-markdown v-model="md" />
  </div>
</template>

<script>
const BaseMarkdown = () => import('~/components/organisms/markdown/BaseMarkdown')

export default {
  components: {
    BaseMarkdown
  },

  props: {
    value: {
      type: String,
      default: undefined
    }
  },

  computed: {
    md: {
      /**
       * @returns { String }
       */
      get() {
        return this.value
      },
      /**
       * @param { String } newVal
       */
      set(newVal) {
        return this.$emit('input', newVal)
      }
    }
  }
}
</script>

<style>

</style>
