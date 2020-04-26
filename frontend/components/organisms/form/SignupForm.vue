<template>
  <v-form>
    <email-text-field />
    <password-text-field />

    <orange-btn type="submit" />
  </v-form>
</template>

<script>
import EmailTextField from '~/components/organisms/textFields/EmailTextField'
import PasswordTextField from '~/components/organisms/textFields/PasswordTextField'
import OrangeBtn from '~/components/atoms/btns/OrangeBtn'

export default {
  components: {
    EmailTextField,
    PasswordTextField,
    OrangeBtn
  }
}
</script>

<style>

</style>
