<template>
  <v-form ref="form" @submit.prevent="onSubmit">
    <email-text-field v-model="email" />
    <password-text-field v-model="password" />

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

  props: {
    errors: {
      type: Object,
      default: undefined
    }
  },

  data: () => ({
    isValid: false,
    password: "",
    email: "",
  }),

  methods: {
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
