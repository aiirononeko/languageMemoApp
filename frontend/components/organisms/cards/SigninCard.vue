<template>
  <v-card class="pa-6">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="8">
        <signin-form />
      </v-col>

      <v-col cols="12" sm="4" md="3" style="max-width: 300px">
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
