<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy" @submit.prevent="onSubmit">
    <email-text-field v-model="email" :api-error="emailApiError" :submit-count="submitCount" />

    <password-text-field v-model="password" :api-error="passwordApiError" :submit-count="submitCount" />

    <div class="text-center mt-4">
      <orange-btn type="submit" :disabled="!valid">
        新規登録
      </orange-btn>
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

    lazy: {
      type: Boolean,
      default: false
    },
  },

  data: () => ({
    valid: false,
    password: "",
    email: "",
    submitCount: 0 /** Submitした回数 */
  }),

  computed: {
    emailApiError() {
      return this.errors && this.errors.email || undefined
    },

    passwordApiError() {
      return this.errors && this.errors.password || undefined
    }
  },

  methods: {
    onSubmit() {
      this.validate()

      const userInfo = { password: this.password, email: this.email }
      this.$emit('signup', userInfo)
      this.submitCount++
    },

    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>

<style>
</style>
