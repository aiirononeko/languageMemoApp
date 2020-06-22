<template>
  <v-text-field
    v-model.trim="valueModel"
    :counter="isVisibledCounter"
    :maxlength="maxlength"
    :label="getLabel"
    :rules="getRule"
    :required="required"
    :error="!change ? !!apiError : false"
    :error-messages="getErrorMessage"
    @change="onChange"
    dense
    name="address"
    outlined
    placeholder="例) Tokyo"
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

    maxlength: {
      type: Number,
      default: 30
    },

    label: {
      type: String,
      default: '出身'
    },

    value: {
      type: String,
      default: undefined,
    },

    required: {
      type: Boolean,
      default: false
    }
  },

  data: () => {
    return {
      change: false,
      rules: {
        required: v => {
          return !!v || "入力してください"
        }
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

      return ret
    },

    /**
     * counterを表示するかどうか
     */
    isVisibledCounter() {
      if (!this.value) {
        return false
      }

      return this.value.length > this.visibledLength
    },

    /**
     * counterを表示するサイズ
     */
    visibledLength () {
      return this.maxlength * 0.8
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
