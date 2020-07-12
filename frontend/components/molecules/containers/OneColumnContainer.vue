<template>
  <BaseContainer :fluid="fluid" :no-gutters="noGutters">
    <v-row justify="center">
      <v-col :cols="cols" :sm="sm" :md="md" :lg="lg" :xl="xl">
        <slot />
      </v-col>
    </v-row>
  </BaseContainer>
</template>

<script>
export default {
  props: {
    cols: {
      type: [Boolean, String, Number],
      default: 12
    },

    fluid: {
      type: Boolean,
      default: false
    },

    lg: {
      type: [Boolean, String, Number],
      default: false
    },

    md: {
      type: [Boolean, String, Number],
      default: 12
    },

    noGutters: {
      type: Boolean,
      default: false
    },

    sm: {
      type: [Boolean, String, Number],
      default: false
    },

    xl: {
      type: [Boolean, String, Number],
      default: false
    }
  }
}
</script>
