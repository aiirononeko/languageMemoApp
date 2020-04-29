<template>
  <client-only>
    <v-btn
      v-text="text"
      class="sidebar-btn"
      nuxt
      outlined
      large
      :to="to"
      width="70%"
      @click="onClick()"
    />
  </client-only>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'ログイン'
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
.sidebar-btn {
  font-size: 1.1rem;
}
</style>
