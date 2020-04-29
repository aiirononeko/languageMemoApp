<template>
  <v-btn :dark="dark" :href="href" :to="to" @click="onClick" color="#DB4A39" class="white--text">
    <google-icon />
    <slot />
  </v-btn>
</template>

<script>
import GoogleIcon from '~/components/atoms/icons/GoogleIcon'

export default {
  components: {
    GoogleIcon
  },

  props: {
    dark: {
      type: Boolean,
      default: false
    },

    to: {
      type: [String, Object],
      default: undefined
    },

    href: {
      type: String,
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

<style scoped>
</style>
