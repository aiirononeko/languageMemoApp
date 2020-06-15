<template>
  <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
    <password-confirmation-text-field
      v-model="password"
      :password_confirmation.sync="password_confirmation"
      :password-api-error="passwordApiError"
      :password_confirmation-api-error="passwordApiError"
      :submit-count="submitCount"
    />

    <div class="d-flex justify-end">
      <blue-btn type="submit" :disabled="!valid">
        送信
      </blue-btn>
    </div>
  </v-form>
</template>

<script>
const BlueBtn = () => import('~/components/atoms/btns/BlueBtn')
const PasswordConfirmationTextField = () => import('~/components/organisms/textFields/PasswordConfirmationTextField')

export default {
  components: {
    BlueBtn,
    PasswordConfirmationTextField
  },

  props: {
    errors: {
      type: Object,
      default: undefined
    },
  },

  data() {
    return {
      password: null,
      password_confirmation: null,
      valid: false,
      submitCount: 0
    }
  },

  computed: {
    passwordApiError() {
      return this.errors && this.errors.password || undefined
    },

    passwordConfirmationApiError() {
      return this.errors && this.errors.password_confirmation || undefined
    },
  },

  methods: {
    onSubmit() {
      this.submitCount++
      this.validate()

      return this.$emit('submit', {
        password: this.password,
        password_confirmation: this.password_confirmation
      })
    },

    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>

<style scoped>

</style>
