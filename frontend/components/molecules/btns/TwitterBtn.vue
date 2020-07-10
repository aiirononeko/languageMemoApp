<template>
  <v-btn
    :dark="dark"
    :fab="fab"
    :href="href"
    :target="vTarget"
    :rel="rel"
    :to="to"
    :x-small="xSmall"
    @click="onClick"
    color="#00AEEF"
    class="white--text"
  >
    <twitter-icon />
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    },

    fab: {
      type: Boolean,
      default: false
    },

    href: {
      type: String,
      default: undefined
    },

    target: {
      type: String,
      default: undefined
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

  computed: {
    xSmall() {
      return this.fab
    },

    /**
     * targetがpropsで設定されていれば、それを返す
     * 設定されていなければ、hrefが設定されているときに、_blankを返す
     *
     * @return { String|undefined }
     */
    vTarget() {
      if (this.target) {
        return this.target
      }
      return this.href ? '_blank' : undefined
    },

    rel() {
      return this.vTarget ? 'noopener' : undefined
    }
  }
}
</script>

<style scoped>
</style>
