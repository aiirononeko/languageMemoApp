<template>
  <v-card class="pt-10 px-6 pb-8">
    <h2 class="mb-3 text-center">本当に削除してよろしいですか？</h2>

    <v-row justify="center">
      <v-col cols="12" sm="8">
        <deactivate-form @submit="onSubmit" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const DeactivateForm = () => import('~/components/organisms/form/DeactivateForm')

export default {
  components: {
    DeactivateForm
  },

  props: {
    errors: {
      type: Object,
      default: undefined
    },
  },

  methods: {
    onSubmit() {
      return this.$emit('deactivate')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
