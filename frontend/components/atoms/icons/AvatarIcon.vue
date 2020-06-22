<template>
  <v-img :src="src" class="user-icon" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: undefined
    }
  }
}
</script>

<style lang="scss" scoped>
.user-icon {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #333;
}
</style>
