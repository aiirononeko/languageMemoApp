<template>
  <v-card class="pa-6">
    <h2 class="mb-3 text-center">Poeta</h2>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <signup-form :errors="errors" @signup="onSignup" />
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
const SignupForm = () => import('~/components/organisms/form/SignupForm')

export default {
  components: {
    SignupForm,
    LoginSnsBtnGroup
  },

  props: {
    errors: {
      type: Object,
      default: undefined
    },
  },

  methods: {
    onSignup(value) {
      this.$emit('signup', value)
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
