<template>
  <BaseSidebarListItem
    :data="data"
    @click="logout"
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
