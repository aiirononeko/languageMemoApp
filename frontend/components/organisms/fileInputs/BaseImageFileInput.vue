<template>
  <!-- TODO: 画像のバリデーションを追加したい -->
  <v-file-input label="画像を選択してください" @change="uploadAvatar" />
</template>

<script>
export default {
  methods: {
    uploadAvatar(avatarfile) {
      if (avatarfile !== undefined && avatarfile !== null) {
        const fr = new FileReader()
        fr.readAsDataURL(avatarfile)
        fr.addEventListener('load', () => {
          this.$emit('input', fr.result)
        })
      }
    }
  }
}
</script>

<style>
.v-file-input {
  width: 400px;
}
</style>
