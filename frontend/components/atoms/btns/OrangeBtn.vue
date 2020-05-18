<template>
  <v-btn
    color="yellow lighten-3"
    class="btn"
    depressed
    :disabled="disabled"
    :large="large"
    :to="to"
    @click="onClick"
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
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss" scoped>
.btn {
  color: #747474;
}
</style>
