<template>
  <!-- validationの処理もここに含めたい -->
    <v-text-field v-model="valueModel" label="ユーザーID" outlined dense />
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
.v-text-field {
  width: 400px;
}
</style>
