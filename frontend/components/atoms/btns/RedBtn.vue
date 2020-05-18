<template>
  <v-btn depressed color="red lighten-2" class="btn" :disabled="disabled" :large="large" :to="to">
    <slot/>
  </v-btn>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false
    },

    large: {
      type: Boolean,
      default: false
    },

    to: {
      type: [String, Object],
      default: undefined
    }
  },
}
</script>

<style lang="scss" scoped>
.btn {
  color: white;
}
</style>
