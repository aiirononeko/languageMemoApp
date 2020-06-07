<template>
  <v-form ref="form" @submit.prevent="onSubmit">
    <email-text-field @input="setEmailValue" :value="email" />
    <password-text-field @input="setPasswordValue" :value="password" />

    <div class="text-center">
      <orange-btn type="submit" :disabled="!isValid">
        ログイン
      </orange-btn>
    </div>
  </v-form>
</template>

<script>
import EmailTextField from "~/components/organisms/textFields/EmailTextField"
import PasswordTextField from "~/components/organisms/textFields/PasswordTextField"
import OrangeBtn from "~/components/atoms/btns/OrangeBtn"

export default {
  components: {
    EmailTextField,
    PasswordTextField,
    OrangeBtn,
  },

  data: () => ({
    showPassword: false,
    isValid: false,
    password: "",
    email: "",
    error: [],
  }),

  methods: {
    setEmailValue(newVal) {
      this.email = newVal
    },

    setPasswordValue(newVal) {
      this.password = newVal
    },

    onSubmit() {
      return this.$emit('signin', {
        email: this.email,
        password: this.password
      })
    }
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

<style></style>
