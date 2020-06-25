<template>
  <!-- TODO: 画像のプレビューを追加したい -->
  <base-image-file-input @input="setAvatarValue" />
</template>

<script>
const BaseImageFileInput = () => import('~/components/organisms/fileInputs/BaseImageFileInput')

export default {
  components: {
    BaseImageFileInput
  },

  methods: {
    setAvatarValue(newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>

<style>

</style>
