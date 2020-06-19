<template>
  <v-btn
    :disabled="disabled"
    :large="large"
    :to="to"
    @click="onClick"
    depressed
    color="red lighten-2"
    class="btn"
  >
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

  methods: {
    onClick() {
      return this.$emit('click')
    }
  },
}
</script>

<style lang="scss" scoped>
.btn {
  color: white;
}
</style>
