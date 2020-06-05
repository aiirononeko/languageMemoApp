<template>
  <v-card class="pt-10 px-6 pb-8">
    <password-reset-confirm-form @submit="onSubmit" />
  </v-card>
</template>

<script>
const PasswordResetConfirmForm = () => import('~/components/organisms/form/PasswordResetConfirmForm')

export default {
  components: {
    PasswordResetConfirmForm
  },

  methods: {
    onSubmit(value) {
      return this.$emit('submit', value)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
