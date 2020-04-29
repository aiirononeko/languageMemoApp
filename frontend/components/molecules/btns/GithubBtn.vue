<template>
  <v-btn :dark="dark" :href="href" :to="to" @click="onClick" color="#171515" class="white--text">
    <github-icon />
    <slot />
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

<style>
  .v-icon {
    margin-right: 4px;
  }
</style>
