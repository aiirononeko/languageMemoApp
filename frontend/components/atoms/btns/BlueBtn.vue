<template>
  <v-btn
    class="btn"
    depressed
    :disabled="disabled"
    :large="large"
    :to="to"
    :color="color"
    @click="onClick"
  >
    <slot/>
  </v-btn>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'blue accent-4'
    },

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
