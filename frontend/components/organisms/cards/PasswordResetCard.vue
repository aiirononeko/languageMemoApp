<template>
  <v-card class="pt-10 px-6 pb-8">
    <h2 class="mb-3 text-center">メールアドレスを入力</h2>

    <v-row justify="center">
      <v-col cols="12" sm="8">
        <password-reset-form :errors="errors" @submit="onSubmit" />
      </v-col>

      <v-col cols="12" sm="8">
        <v-divider class="mb-2" />

        <ul class="list-style-none pl-0">
          <li class="mb-1"><nuxt-link to="/signin">ログインへ</nuxt-link></li>
          <li class="mb-1"><nuxt-link to="/signup">新規登録へ</nuxt-link></li>
        </ul>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
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
