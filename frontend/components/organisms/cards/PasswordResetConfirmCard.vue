<template>
  <v-card class="pt-10 px-6 pb-8">
    <v-row justify="center">
      <v-col cols="12" sm="8">
        <password-reset-confirm-form :errors="errors" @submit="onSubmit" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const PasswordResetConfirmForm = () => import('~/components/organisms/form/PasswordResetConfirmForm')

export default {
  components: {
    PasswordResetConfirmForm
  },

  props: {
    errors: {
      type: Object,
      default: undefined
    },
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
