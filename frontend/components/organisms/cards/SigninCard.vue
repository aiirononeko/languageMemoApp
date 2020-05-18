<template>
  <v-card width="800" height="300" class="mx-auto">
    <v-row class="w-100 h-100" justify="center" align="center">
      <div class="mr-1 mr-md-6 mr-lg-10">
        <signin-form />
      </div>

      <div class="ml-1 ml-md-6 ml-lg-10">
        <p>その他のアカウント</p>
        <login-sns-btn-group />
      </div>
    </v-row>
  </v-card>
</template>

<script>
import LoginSnsBtnGroup from '~/components/organisms/btnGroup/LoginSnsBtnGroup'
import SigninForm from '~/components/organisms/form/SigninForm'

export default {
  components: {
    LoginSnsBtnGroup,
    SigninForm
  }
}
</script>
