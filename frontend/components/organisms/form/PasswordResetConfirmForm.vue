<template>
  <v-form @submit.prevent="onSubmit">
    <password-confirmation-text-field
      v-model="password"
      :cvalue="password_confirmation"
      @cinput="onCInput"
    />

    <div class="d-flex justify-end">
      <blue-btn type="submit">
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
      password_confirmation: null
    }
  },

  methods: {
    onCInput(newVal) {
      this.password_confirmation = newVal
    },

    onSubmit() {
      return this.$emit('submit', {
        password: this.password,
        password_confirmation: this.password_confirmation
      })
    }
  }
}
</script>

<style scoped>

</style>
