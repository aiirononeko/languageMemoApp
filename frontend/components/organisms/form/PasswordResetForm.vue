<template>
  <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
    <email-text-field v-model="email" :api-error="emailApiError" :submit-count="submitCount" />

    <div class="d-flex justify-end">
      <blue-btn type="submit" :disabled="!valid">
        送信
      </blue-btn>
    </div>
  </v-form>
</template>

<script>
const BlueBtn = () => import('~/components/atoms/btns/BlueBtn')
const EmailTextField = () => import('~/components/organisms/textFields/EmailTextField')

export default {
  components: {
    BlueBtn,
    EmailTextField
  },

  props: {
    errors: {
      type: Object,
      default: undefined
    },
  },

  data() {
    return {
      email: null,
      valid: false,
      submitCount: 0
    }
  },

  computed: {
    emailApiError() {
      return this.errors && this.errors.email || undefined
    },
  },

  methods: {
    onSubmit() {
      this.submitCount++
      this.validate()

      return this.$emit('submit', this.email)
    },

    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>

<style scoped>

</style>
