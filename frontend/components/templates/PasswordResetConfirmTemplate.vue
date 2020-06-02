<template>
  <one-column-container>
    <h1 class="main-heading mb-8 text-center">新しいパスワードを入力してください</h1>

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
