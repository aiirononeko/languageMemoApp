<template>
  <settings-index-template />
</template>

<script>
export default {
  middleware: "authenticated",

  head() {
    return {
      title: "設定"
    }
  }
}
</script>
