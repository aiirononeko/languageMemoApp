<template>
  <v-card class="pt-10 px-6 pb-8">
    <password-reset-form :errors="errors" @submit="onSubmit" />
  </v-card>
</template>

<script>
const PasswordResetForm = () => import('~/components/organisms/form/PasswordResetForm')

export default {
  components: {
    PasswordResetForm
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
