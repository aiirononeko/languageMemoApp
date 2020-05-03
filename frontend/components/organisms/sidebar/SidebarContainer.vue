<template>
  <v-navigation-drawer v-model="value" app fixed clipped>
    <slot />
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onInput(newVal) {
      return this.$emit('input', newVal)
    }
  },
}
</script>
