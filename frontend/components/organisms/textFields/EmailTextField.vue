<template>
  <!-- validationの処理もここに含めたい -->
  <v-text-field
    v-model="valueModel"
    :label="getLabel"
    :rules="getRule"
    :required="required"
    :error="!change ? !!apiError : false"
    :error-messages="getErrorMessage"
    @change="onChange"
    dense
    type="email"
    name="email"
    outlined
  />
</template>

<script>
export default {
  props: {
    apiError: {
      type: Array,
      default: undefined
    },

    submitCount: {
      type: Number,
      default: 0
    },

    label: {
      type: String,
      default: 'メール'
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
      change: false,
      rules: {
        required: value => {
          return !!value || "入力してください"
        },
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '不正なメールアドレスです'
        },
      },
    }
  },

  computed: {
    getErrorMessage() {
      return !this.change ? this.apiError : []
    },

    getLabel() {
      return this.required ? `${this.label} (必須)` : this.label
    },

    getRule() {
      const ret = []

      this.required && ret.push(this.rules.required)
      ret.push(this.rules.email)

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
