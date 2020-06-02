<template>
  <one-column-container>
    <password-reset-confirm-card @submit="onSubmit" />
  </one-column-container>
</template>

<script>
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')
const PasswordResetConfirmCard = () => import('~/components/organisms/cards/PasswordResetConfirmCard')

export default {
  components: {
    OneColumnContainer,
    PasswordResetConfirmCard
  },

  methods: {
    onSubmit(value) {
      return this.$emit('submit', value)
    }
  }
}
</script>

<style scoped>

</style>
