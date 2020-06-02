<template>
  <v-form @submit="onSubmit">
    <password-confirmation-text-field
      v-model="password"
      :cvalue="password_confirmation"
      @cinput="onCInput"
    />

    <div class="d-flex justify-end">
      <blue-btn>
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

  data() {
    return {
      password: null,
      password_confirmation: null
    }
  },

  methods: {
    onCInput(newVal) {
      this.password_confirmation = newVal
    },

    onSubmit() {
      return this.$emit('submit', this.email)
    }
  }
}
</script>

<style scoped>

</style>
