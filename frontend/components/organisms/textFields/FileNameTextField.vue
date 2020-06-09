<template>
  <v-text-field
    v-model.trim="valueModel"
    :required="required"
    :rules="[rules.required]"
    dense
    rounded
    outlined
    placeholder="ファイル名"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ""
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
