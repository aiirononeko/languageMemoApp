<template>
  <v-btn :dark="dark" :href="href" :to="to" @click="onClick" color="#00AEEF" class="white--text">
    <twitter-icon />
    <slot />
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
