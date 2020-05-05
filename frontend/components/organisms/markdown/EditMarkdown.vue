<template>
  <v-textarea v-model="md" auto-grow outlined />
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
