<template>
  <v-list-item :to="`/${username}/${id}`">
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

    id: {
      type: Number,
      required: true
    },

    username: {
      type: String,
      required: true
    },
  }
}
</script>

<style>

</style>