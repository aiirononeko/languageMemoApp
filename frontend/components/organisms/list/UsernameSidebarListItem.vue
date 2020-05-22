<template>
  <base-sidebar-list-item
    :data="newData"
  />
</template>

<script>
const BaseSidebarListItem = () => import('~/components/organisms/list/BaseSidebarListItem')

export default {
  components: {
    BaseSidebarListItem
  },

  props: {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    newData() {
      const data = this.data
      data.to = `/${this.username}`
      return data
    },

    username() {
      return this.$store.getters["authentication/username"]
    }
  },
}
</script>

