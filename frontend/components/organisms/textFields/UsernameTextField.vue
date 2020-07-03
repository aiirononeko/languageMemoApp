<template>
  <v-text-field
    v-model="valueModel"
    :counter="isVisibledCounter"
    :error="!change ? !!apiError : false"
    :error-messages="getErrorMessage"
    :required="required"
    :rules="getRule"
    :maxlength="maxlength"
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
import User from '@/types/User'

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

    maxlength: {
      type: Number,
      default: 30
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
      username: (v) => {
        return (!!v && User.isValidUsername(v)) || "半角英数字とアンダーバー(_)のみ使用可能です"
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
      ret.push(this.rules.username)

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
