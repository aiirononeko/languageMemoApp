<template>
  <v-avatar :size="size">
    <v-img :src="src" :alt="alt" />
  </v-avatar>
</template>

<script>
export default {
  props: {
    alt: {
      type: String,
      default: undefined
    },

    size: {
      type: Number,
      default: 80
    },

    src: {
      type: String,
      default: undefined
    }
  }
}
</script>
