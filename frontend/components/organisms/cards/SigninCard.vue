<template>
  <v-card width="800" height="300">
    <v-row class="d-flex flex-row justify-center align-center">
      <div class="mr-10">
        <signin-form />
      </div>

      <div class="ml-10">
        <p>その他のアカウント</p>
        <login-sns-btn-group />
      </div>
    </v-row>
  </v-card>
</template>

<script>
import LoginSnsBtnGroup from '~/components/organisms/btnGroup/LoginSnsBtnGroup'
import SigninForm from '~/components/organisms/form/SinginForm'

export default {
  components: {
    LoginSnsBtnGroup,
    SigninForm
  }
}
</script>

<style scoped>
  .row {
    width: 100%;
    height: 100%;
  }
</style>
