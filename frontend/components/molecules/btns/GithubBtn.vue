<template>
  <v-btn :dark="dark" :href="href" :to="to" @click="onClick">
    <github-icon />
  </v-btn>
</template>

<script>
import GithubIcon from '~/components/atoms/icons/GithubIcon'

export default {
  components: {
    GithubIcon
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
