<template>
  <v-btn-toggle>
    <v-btn value="edit" :to="`/edit/${fileid}?status=edit`" exact replace>
      <v-icon v-text="`mdi-pencil`" />
    </v-btn>

    <v-btn value="both" :to="`/edit/${fileid}?status=both`" exact replace>
      <v-icon v-text="`mdi-view-split-vertical`" />
    </v-btn>

    <v-btn value="view" :to="`/edit/${fileid}?status=view`" exact replace>
      <v-icon v-text="`mdi-eye`" />
    </v-btn>
  </v-btn-toggle>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: undefined
    },

    fileid: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
