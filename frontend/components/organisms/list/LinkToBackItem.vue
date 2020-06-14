<template>
  <v-list-item :to="to">
    <v-list-item-icon>
      <v-icon>mdi-arrow-left-circle</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss">
  .v-icon {
    cursor: pointer;
  }
</style>
