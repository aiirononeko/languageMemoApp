<template>
  <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
    <EmailTextField v-model="email" :api-error="emailApiError" :submit-count="submitCount" />

    <div class="d-flex justify-end">
      <BlueBtn type="submit" :disabled="!valid">
        送信
      </BlueBtn>
    </div>
  </v-form>
</template>

<script>
export default {
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
