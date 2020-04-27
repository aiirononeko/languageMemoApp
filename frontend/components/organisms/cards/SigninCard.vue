<template>
  <v-card>
    <v-row>
      <div>
        <signin-form />
      </div>

      <div>
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

<style>

</style>
