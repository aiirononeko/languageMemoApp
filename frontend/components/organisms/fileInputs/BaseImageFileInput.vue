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
    uploadAvatar(file) {
      if (!file) {
        return this.$emit('input', undefined)
      }

      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = () => this.$emit('input', fr.result)
    },

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
