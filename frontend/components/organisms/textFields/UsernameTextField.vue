<template>
  <v-text-field
    v-model="valueModel"
    :error="!change ? !!apiError : false"
    :error-messages="getErrorMessage"
    :required="required"
    :rules="getRule"
    :persistent-hint="persistentHint"
    @change="onChange"
    label="ユーザーID"
    outlined
    dense
    hint="半角英数字とアンダーバー(_)のみ使用可能です"
    inputmode="verbatim"
  />
</template>

<script>
export default {
  props: {
    apiError: {
      type: Array,
      default: undefined
    },

    persistentHint: {
      type: Boolean,
      default: true
    },

    submitCount: {
      type: Number,
      default: 0
    },

    required: {
      type: Boolean,
      default: true
    },

    value: {
      type: String,
      default: undefined,
    },
  },

  data: () => ({
    change: false,
    rules: {
      required: (v) => {
        return !!v || "入力してください"
      },
      maxLength: (v) => {
        return (v && v.length <= 30) || "30文字以内で入力してください"
      }
    },
  }),

  computed: {
    getApiError() {
      return this.apiError ? this.apiError.map((v) => `ユーザーID${v}`) : this.apiError
    },

    getErrorMessage() {
      return !this.change ? this.getApiError : []
    },

    getRule() {
      const ret = []

      this.required && ret.push(this.rules.required)
      ret.push(this.rules.maxLength)

      return ret
    },

    valueModel: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit("input", newVal)
      },
    },
  },

  methods: {
    onChange() {
      this.change = true
    }
  },

  watch: {
    submitCount: function()  {
      this.change = false
    }
  }
}
</script>
