<template>
  <v-card class="pa-6">
    <h2 class="mb-3 text-center">Poeta</h2>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="8">
        <signup-form @signup="signup" />
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
const SignupForm = () => import('~/components/organisms/form/SignupForm')

export default {
  components: {
    SignupForm,
    LoginSnsBtnGroup
  },

  methods: {
    signup(userInfo) {
      this.$emit('signup', userInfo)
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
