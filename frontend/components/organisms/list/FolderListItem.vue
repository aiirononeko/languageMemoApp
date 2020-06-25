<template>
  <v-list-item :to="to">
    <v-list-item-icon>
      <v-icon>mdi-folder</v-icon>
    </v-list-item-icon>

    <v-list-item-content>
      <v-list-item-title>
          {{ name }}
      </v-list-item-title>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },

    to: {
      type: [String, Object],
      default: undefined
    }
  }
}
</script>

<style>

</style>
