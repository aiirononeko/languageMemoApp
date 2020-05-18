<template>
  <base-sidebar-list-item
    :data="data"
    @click="logout"
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

  methods: {
    async logout() {
      try {
        await this.$store.dispatch("authentication/logout")

        this.$router.push(`/signin`)
      } catch (e) {
        console.error(e)
      }
    }
  },
}
</script>

<style>

</style>
