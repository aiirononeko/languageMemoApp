<template>
  <client-only>
    <v-btn v-text="text" class="header-btn" large nuxt text :to="to" @click="onClick()"  />
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
.header-btn {
  font-size: 1.1rem;
}
</style>
