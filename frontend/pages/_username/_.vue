<template>
  <div>
    <p>パラメータ：{{ params }}</p>
    <p>ディレクトリ: {{ getDirArr  }}</p>
    <p>拡張子：{{ getExt }}</p>
    <p>ファイル名：{{ getFilename }}</p>
    <p>ファイルであるか：{{ isFile }}</p>
  </div>
</template>

<script>
import { getDirArr, getExt, getFilename, isFile } from '~/utils/path'

export default {
  computed: {
    params() {
      return this.$route.params
    },

    getDirArr() {
      return getDirArr(this.params.pathMatch)
    },

    getExt() {
      return getExt(this.params.pathMatch)
    },

    getFilename() {
      return getFilename(this.params.pathMatch)
    },

    isFile() {
      return isFile(this.params.pathMatch)
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
