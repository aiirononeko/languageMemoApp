<template>
  <v-card class="pa-6">
    <h2 class="mb-3 text-center">Poeta</h2>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <signin-form @signin="onSignin" />
      </v-col>

      <v-col cols="12" sm="4" md="3" class="max-width-300">
        <h2 class="other-heading">その他のアカウント</h2>
        <login-sns-btn-group />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const LoginSnsBtnGroup = () => import('~/components/organisms/btnGroup/LoginSnsBtnGroup')
const SigninForm = () => import('~/components/organisms/form/SigninForm')

export default {
  components: {
    LoginSnsBtnGroup,
    SigninForm
  },

  methods: {
    onSignin(value) {
      return this.$emit('signin', value)
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
