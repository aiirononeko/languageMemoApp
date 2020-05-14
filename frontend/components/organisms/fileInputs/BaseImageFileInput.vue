<template>
  <!-- TODO: 画像のバリデーションを追加したい -->
  <v-file-input label="画像を選択してください" @change="uploadAvatar" />
</template>

<script>
export default {
  methods: {
    uploadAvatar(avatarfile) {
      this.$emit('input', avatarfile)
    }
  }
}
</script>

<style>
.v-file-input {
  width: 400px;
}
</style>
