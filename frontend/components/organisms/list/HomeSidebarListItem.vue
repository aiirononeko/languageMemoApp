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
      if(this.$store.getters["authentication/accessToken"]) {
        data.to = `/${this.username}`
      } else {
        data.to = '/about'
      }
      return data
    },

    username() {
      return this.$store.getters["authentication/username"]
    }
  },
}
</script>

