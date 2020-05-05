<template>
  <v-form ref="form">
    <email-text-field @input="setEmailValue" :value="email" />
    <password-text-field @input="setPasswordValue" :value="password" />
    <p class="mb-6">※半角英数字のみ使用可能です</p>

    <div class="button">
      <orange-btn type="submit" :disabled="!isValid" @onClick="onClick">
        新規登録
      </orange-btn>
    </div>
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
  },

  data: () => ({
    showPassword: false,
    isValid: false,
    password: "",
    email: "",
    error: [],
  }),

  methods: {
    onClick() {
      const userInfo = { password: this.password, email: this.email }
      this.$emit('signup', userInfo)
    },

    setEmailValue(newVal) {
      this.email = newVal
    },

    setPasswordValue(newVal) {
      this.password = newVal
    },
  },

  watch: {
    email: function (e) {
      this.isValid = this.$refs.form.validate()
    },

    password: function (e) {
      this.isValid = this.$refs.form.validate()
    },
  },
}
</script>

<style>
.button {
  text-align: center;
}
</style>
