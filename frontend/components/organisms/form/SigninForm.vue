<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy" @submit.prevent="onSubmit">
    <EmailTextField v-model="email" :api-error="emailApiError" :submit-count="submitCount" />

    <PasswordTextField
      v-model="password"
      :api-error="passwordApiError"
      :persistent-hint="false"
      :submit-count="submitCount"
    />

    <div class="text-center">
      <OrangeBtn type="submit" :disabled="!valid">
        ログイン
      </OrangeBtn>
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
      this.submitCount++

      return this.$emit('signin', {
        email: this.email,
        password: this.password
      })
    },

    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>

<style></style>
