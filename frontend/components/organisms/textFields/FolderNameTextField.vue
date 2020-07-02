<template>
  <v-text-field
    v-model.trim="valueModel"
    :counter="isVisibledCounter"
    :maxlength="maxlength"
    :required="required"
    :rounded="rounded"
    :outlined="outlined"
    :rules="[rules.required]"
    dense
    placeholder="フォルダ名"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
    },

    maxlength: {
      type: Number,
      default: 50
    },

    rounded: {
      type: Boolean,
      default: false
    },

    outlined: {
      type: Boolean,
      default: false
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
        }
      }
    }
  },

  computed: {

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
        return this.$emit('input', newVal)
      }
    }
  }
}
</script>

<style scoped>

</style>
