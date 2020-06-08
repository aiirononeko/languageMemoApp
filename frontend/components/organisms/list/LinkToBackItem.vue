<template>
  <v-list-item @click="$emit('toBackFolder')">
    <v-list-item-icon>
      <v-icon>mdi-arrow-left-circle</v-icon>
    </v-list-item-icon>
  </v-list-item>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .v-icon {
    cursor: pointer;
  }
</style>
