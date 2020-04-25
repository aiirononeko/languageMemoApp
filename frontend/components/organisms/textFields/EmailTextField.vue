<template>
  <!-- validationの処理もここに含めたい -->
  <v-text-filed v-model="valueModel" />
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
    valueModel:{
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
