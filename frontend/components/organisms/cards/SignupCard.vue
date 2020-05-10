<template>
  <v-card width="800" height="400" class="mx-auto pt-4">
    <h2 class="mb-10 text-center">Poeta</h2>
    <v-row class="d-flex flex-row justify-center ">
      <signup-form class="mr-10" @signup="signup" />

      <div class="ml-10">
        <p>その他のアカウント</p>
        <login-sns-btn-group />
      </div>
    </v-row>
  </v-card>
</template>

<script>
import LoginSnsBtnGroup from '~/components/organisms/btnGroup/LoginSnsBtnGroup'
import SignupForm from '~/components/organisms/form/SignupForm'

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

<style>
  .row {
    width: 100%;
    height: 100%;
  }
</style>
