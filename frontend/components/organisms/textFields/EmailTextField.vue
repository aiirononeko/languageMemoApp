<template>
  <!-- validationの処理もここに含めたい -->
  <v-text-field label="メール" v-model="valueModel" :rules="[rules.required]" />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: undefined,
    },
  },

  data: () => {
    return {
      rules: {
        required: (value) => {
          return !!value || "入力してください"
        },
      },
    }
  },

  computed: {
    valueModel: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit("input", newVal)
      },
    },
  },
}
</script>

<style></style>
