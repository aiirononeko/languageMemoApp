<template>
  <v-container
    :class="{ 'no-gutters': noGutters }"
    :fluid="fluid"
    :id="id"
    :tag="tag"
  >
    <slot />
  </v-container>
</template>

<script>
export default {
  props: {
    fluid: {
      type: Boolean,
      default: false
    },

    id: {
      type: String,
      default: undefined
    },

    noGutters: {
      type: Boolean,
      default: false
    },

    tag: {
      type: String,
      default: 'div'
    }
  }
}
</script>

<style lang="scss" scoped>
.no-gutters {
  padding: {
    left: 0;
    right: 0;
  };
}
</style>
