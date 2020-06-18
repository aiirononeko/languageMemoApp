<template>
  <v-form ref="form" v-model="valid" :lazy-validation="lazy" @submit.prevent="onSubmit">
    <email-text-field v-model="email" :api-error="emailApiError" :submit-count="submitCount" />

    <password-text-field
      v-model="password"
      :api-error="passwordApiError"
      :persistent-hint="false"
      :submit-count="submitCount"
    />

    <div class="text-center">
      <orange-btn type="submit" :disabled="!valid">
        ログイン
      </orange-btn>
    </div>
  </v-form>
</template>

<script>
const EmailTextField = () => import("~/components/organisms/textFields/EmailTextField")
const PasswordTextField = () => import("~/components/organisms/textFields/PasswordTextField")
const OrangeBtn = () => import("~/components/atoms/btns/OrangeBtn")

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
