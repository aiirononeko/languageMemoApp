<template>
  <v-row>
    <v-col cols="11" class="pa-0">
      <v-list-item :to="to" exact>
        <v-list-item-icon>
          <v-icon>mdi-arrow-left-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title />
        </v-list-item-content>
      </v-list-item>
    </v-col>
  </v-row>
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
