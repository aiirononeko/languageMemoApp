<template>
  <v-list-item :to="`/${username}/${id}`">
    <v-list-item-icon>
      <v-icon>mdi-file</v-icon>
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
      default: undefined
    },

    id: {
      type: String,
      default: undefined
    },

    username: {
      type: String,
      default: undefined
    },
  }
}
</script>

<style>

</style>