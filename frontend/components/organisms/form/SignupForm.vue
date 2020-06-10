<template>
  <v-form ref="form" @submit.prevent="onSubmit">
    <email-text-field v-model="email" />
    <password-text-field v-model="password" />
    <p class="mb-6">※半角英数字のみ使用可能です</p>

    <div class="text-center">
      <orange-btn type="submit" :disabled="!isValid">
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
    isValid: false,
    password: "",
    email: "",
    error: [],
  }),

  methods: {
    onSubmit() {
      const userInfo = { password: this.password, email: this.email }
      this.$emit('signup', userInfo)
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

<style>
</style>
