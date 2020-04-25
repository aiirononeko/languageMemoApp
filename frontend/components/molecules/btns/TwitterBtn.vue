<template>
  <v-btn :dark="dark" :href="href" :to="to" @click="onClick">
    <twitter-icon />
  </v-btn>
</template>

<script>
import TwitterIcon from '~/components/atoms/icons/TwitterIcon'

export default {
  components: {
    TwitterIcon
  },

  props: {
    dark: {
      type: Boolean,
      default: true
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

<style>

</style>
