<template>
  <v-card class="pa-6">
    <h2 class="mb-3 text-center">Poeta</h2>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <signin-form :errors="errors" @signin="onSignin" />
      </v-col>

      <v-col cols="12" sm="4" md="3" class="max-width-300">
        <h2 class="other-heading">その他のアカウント</h2>
        <login-sns-btn-group @snsauth="onSnsauth" />
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
