<template>
  <div>
    <v-text-field
      label="パスワード"
      v-model.trim="valueModel"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :rules="[rules.required, rules.min]"
      :type="showPassword ? 'text' : 'password'"
      :persistent-hint="persistentHint"
      :error="!change ? !!passwordApiError : false"
      :error-messages="getPasswordErrorMessage"
      @click:append="showPassword = !showPassword"
      @change="onChange"
      counter
      outlined
      required
      inputmode="verbatim"
      hint="8文字以上の半角英数字のみ使用可能です"
      dense
    />

    <v-text-field
      label="パスワード(確認用)"
      v-model.trim="passwordConfirmationModel"
      :error="!change ? !!password_confirmationApiError : false"
      :error-messages="getPasswordConfirmationErrorMessage"
      :rules="[passwordConfirmationRule]"
      :type="showPassword ? 'text' : 'password'"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      @change="onChange"
      counter
      required
      inputmode="verbatim"
      outlined
      dense
    />
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: String,
        default: undefined,
      },

      password_confirmation: {
        type: String,
        default: undefined,
      },

      passwordApiError: {
        type: [String, Array],
        default: undefined
      },

      password_confirmationApiError: {
        type: [String, Array],
        default: undefined
      },

      persistentHint: {
        type: Boolean,
        default: true
      },

      submitCount: {
        type: Number,
        default: 0
      },
    },

    data: () => {
      return {
        rules: {
          required: (value) => {
            return !!value || "入力してください"
          },
          min: (value) => {
            return (value && value.length >= 8) || "８文字以上入力してください"
          }
        },
        change: false,
        showPassword: false,
      }
    },

    computed: {
      getPasswordErrorMessage() {
        return !this.change ? this.passwordApiError : []
      },

      getPasswordConfirmationErrorMessage() {
        return !this.change ? this.password_confirmationApiError : []
      },

      valueModel: {
        get() {
          return this.value
        },

        set(newVal) {
          return this.$emit("input", newVal)
        },
      },

      passwordConfirmationModel: {
        get() {
          return this.password_confirmation
        },
        set(newVal) {
          return this.$emit("update:password_confirmation", newVal)
        }
      },

      passwordConfirmationRule() {
        return () => (this.value === this.password_confirmation) || 'パスワードが一致しません'
      }
    },

  methods: {
    onChange() {
      this.change = true
    }
  },

  watch: {
    submitCount: function()  {
      this.change = false
    }
  }
  }
</script>

<style></style>
