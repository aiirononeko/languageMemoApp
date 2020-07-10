<template>
  <BaseSidebarListItem
    :data="newData"
  />
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    newData() {
      const data = Object.assign({}, this.data)
      data.to = `/${this.username}`
      return data
    },

    username() {
      return this.$store.getters["authentication/username"]
    }
  },
}
</script>

