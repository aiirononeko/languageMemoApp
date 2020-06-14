<template>
  <!-- validationの処理もここに含めたい -->
  <v-text-field
    v-model="valueModel"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :label="getLabel"
    :required="required"
    :rules="getRule"
    :type="showPassword ? 'text' : 'password'"
    :persistent-hint="persistentHint"
    @change="onChange"
    @click:append="showPassword = !showPassword"
    counter
    outlined
    hint="8文字以上の半角英数字のみ使用可能です"
    name="password"
    dense
  />
</template>

<script>
export default {
  props: {
    apiError: {
      type: Array,
      default: undefined
    },

    label: {
      type: String,
      default: 'パスワード'
    },

    persistentHint: {
      type: Boolean,
      default: true
    },

    submitCount: {
      type: Number,
      default: 0
    },

    value: {
      type: String,
      default: undefined,
    },

    required: {
      type: Boolean,
      default: true
    }
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
      change: false,
      showPassword: false,
    }
  },

  computed: {
    getLabel() {
      return this.required ? `${this.label} (必須)` : this.label
    },

    getRule() {
      const ret = []

      this.required && ret.push(this.rules.required)
      ret.push(this.rules.min)

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

<style></style>
