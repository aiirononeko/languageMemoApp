<template>
  <!-- validationの処理もここに含めたい -->
  <v-text-field
    label="パスワード"
    v-model="valueModel"
    :rules="[rules.required, rules.min]"
    :type="showPassword ? 'text' : 'password'"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="showPassword = !showPassword"
    counter
  />
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
        min: (value) => {
          return value.length >= 8 || "８文字以上入力してください"
        },
      },

      showPassword: false,
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
