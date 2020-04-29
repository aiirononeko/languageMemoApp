<template>
  <v-btn :dark="dark" :href="href" :to="to" @click="onClick" :fab="fab" :x-small="xSmall" color="#171515" class="white--text" >
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
    },

    fab: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    onClick() {
      return this.$emit('click')
    }
  },

  computed: {
    xSmall() {
      return this.fab ? true : false
    }
  }
}
</script>

<style scoped>
</style>
