<template>
  <one-column-container>
    <h1 class="main-heading mb-8 text-center">パスワードをリセットする</h1>

    <v-row justify="center">
      <v-col cols="12" sm="8">
        <password-reset-card @submit="onSubmit" />
      </v-col>
    </v-row>
  </one-column-container>
</template>

<script>
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')
const PasswordResetCard = () => import('~/components/organisms/cards/PasswordResetCard')

export default {
  components: {
    OneColumnContainer,
    PasswordResetCard
  },

  methods: {
    onSubmit(value) {
      return this.$emit('submit', value)
    }
  }
}
</script>
