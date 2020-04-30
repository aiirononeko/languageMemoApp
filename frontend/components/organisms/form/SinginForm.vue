<template>
  <v-form ref="form">
    <email-text-field @input="setEmailValue" :value="email" />
    <password-text-field @input="setPasswordValue" :value="password" />

    <orange-btn type="submit" :canClick="!isValid" @onClick="login">
      ログイン
    </orange-btn>
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
    async login(e) {
      try {
        await this.$store.dispatch("authentication/login", {
          email: this.email,
          password: this.password,
        })

        this.$router.push(`/user/${this.$store.getters["authentication/id"]}`)
      } catch (e) {
        console.log(this.formError)
      }
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

<style></style>
