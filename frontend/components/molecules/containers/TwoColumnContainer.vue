<template>
  <base-container>
    <v-row :justify="justify">
      <v-col :cols="leftCols">
        <slot name="left" />
      </v-col>

      <v-col :cols="rightCols">
        <slot name="right" />
      </v-col>
    </v-row>
  </base-container>
</template>

<script>
import BaseContainer from '~/components/molecules/containers/BaseContainer'

export default {
  components: {
    BaseContainer
  },

  props: {
    leftCols: {
      type: Number,
      defalut: 8
    },

    rightCols: {
      type: Number,
      defalut: 4
    },

    justify: {
      type: String,
      defalut: 'center'
    }
  }
}
</script>

<style>

</style>
