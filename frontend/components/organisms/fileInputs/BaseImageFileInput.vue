<template>
  <v-file-input
    :error="!change ? !!apiError : false"
    :error-messages="getErrorMessage"
    :persistent-hint="true"
    @change="onChange"
    accept="image/png,image/jpg,image/jpeg"
    hint="pngかjpg形式の画像"
    label="画像を選択してください"
    show-size
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
    }
  },

  data() {
    return {
      change: false
    }
  },

  computed: {
    getErrorMessage() {
      return !this.change ? this.apiError : []
    },
  },

  methods: {
    /**
     * @param { File } file
     */
    uploadAvatar(file) {
      if (!file) {
        return this.$emit('input', undefined)
      }

      return this.$emit('input', file)
    },

    /**
     * @param { File } file
     */
    onChange(file) {
      this.change = true

      this.uploadAvatar(file)
    }
  },

  watch: {
    submitCount: function()  {
      this.change = false
    }
  }
}
</script>
