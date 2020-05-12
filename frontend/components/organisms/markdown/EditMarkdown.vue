<template>
  <client-only>
    <v-textarea v-model="md" auto-grow outlined />
  </client-only>
</template>

<script>
export default {
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
