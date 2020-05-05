<template>
  <div>
    <!-- TODO: fileの内容を表示したい -->
    <!-- Ex: CSSの基礎、セレクタとは -->
    <div id="md_view" v-html="html" />
  </div>
</template>

<script>
export default {
  props: {
    md: {
      type: String,
      default: undefined
    }
  },

  computed: {
    html() {
      return this.$md.render(this.md)
    }
  },
}
</script>

<style>

</style>
