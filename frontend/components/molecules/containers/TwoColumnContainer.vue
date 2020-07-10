<template>
  <base-container :fluid="fluid" :no-gutters="noGutters">
    <v-row>
      <slot name="top" />
    </v-row>

    <v-row :justify="justify" :class="bottomClass">
      <v-col :cols="leftCols" :sm="leftSm" :md="leftMd" :lg="leftLg" :xl="leftXl">
        <slot name="left" />
      </v-col>

      <v-col :cols="rightCols" :sm="rightSm" :md="rightMd" :lg="rightLg" :xl="rightXl">
        <slot name="right" />
      </v-col>
    </v-row>
  </base-container>
</template>

<script>
export default {
  props: {
    bottomClass: {
      type: String,
      default: undefined
    },

    fluid: {
      type: Boolean,
      default: false
    },

    justify: {
      type: String,
      defalut: 'center'
    },

    leftCols: {
      type: Number,
      defalut: 8
    },

    leftLg: {
      type: [Boolean, String, Number],
      default: false
    },

    leftMd: {
      type: [Boolean, String, Number],
      default: false
    },

    leftSm: {
      type: [Boolean, String, Number],
      default: false
    },

    leftXl: {
      type: [Boolean, String, Number],
      default: false
    },

    noGutters: {
      type: Boolean,
      default: false
    },

    rightCols: {
      type: Number,
      defalut: 4
    },

    rightLg: {
      type: [Boolean, String, Number],
      default: false
    },

    rightMd: {
      type: [Boolean, String, Number],
      default: false
    },

    rightSm: {
      type: [Boolean, String, Number],
      default: false
    },

    rightXl: {
      type: [Boolean, String, Number],
      default: false
    }
  }
}
</script>

<style>

</style>
