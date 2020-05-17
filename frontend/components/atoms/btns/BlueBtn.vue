<template>
  <v-btn depressed color="blue accent-4" class="btn" :large="large" :to="to" @click="onClick">
    <slot/>
  </v-btn>
</template>

<script>
export default {
  props: {
    large: {
      type: Boolean,
      default: false
    },

    to: {
      type: [String, Object],
      default: "#"
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
