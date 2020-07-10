<template>
  <v-card class="pa-6">
    <h2 class="mb-3 text-center">Poeta</h2>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <signin-form :errors="errors" @signin="onSignin" />
      </v-col>

      <v-col cols="12" sm="4" md="3" class="max-width-300">
        <h2 class="other-heading">その他のアカウント</h2>

        <LoginSnsBtnGroup @snsauth="onSnsauth" />
      </v-col>

      <v-col cols="12" sm="12" md="9" class="text-right">
        <v-divider class="mb-2" />

        <ul class="list-style-none pl-0">
          <li class="mb-1"><nuxt-link to="/password/reset">パスワードをリセット</nuxt-link></li>
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
    }
  },

  methods: {
    onSignin(value) {
      return this.$emit('signin', value)
    },

    onSnsauth(value) {
      return this.$emit('snsauth', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.other-heading {
  font-size: 1rem;
  font-weight: normal;
  margin-bottom: 0.5rem;
}
</style>
