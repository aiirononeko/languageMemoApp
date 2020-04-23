<template>
  <div>
    <p>ファイル名：{{ fileID }}</p>
  </div>
</template>

<script>
export default {
  middleware: "authenticated",

  computed: {
    fileID() {
      return this.$route.params.fileID
    },

    status() {
      return this.$route.query.status
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
