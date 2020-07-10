<template>
  <OneColumnContainer>
    <h1 class="main-heading mb-8 text-center">パスワードをリセットする</h1>

    <v-row justify="center">
      <v-col cols="12" sm="8">
        <PasswordResetCard v-if="!success" :errors="errors" @submit="onSubmit" />

        <v-alert
          border="top"
          colored-border
          type="info"
          elevation="2"
          v-else
        >
          {{ message }}
        </v-alert>
      </v-col>
    </v-row>
  </OneColumnContainer>
</template>

<script>
export default {
  props: {
    errors: {
      type: Object,
      default: undefined
    },

    success: {
      type: Boolean,
      default: false
    },

    /**
     * 成功時のメッセージ
     */
    message: {
      type: String,
      default: undefined
    }
  },

  methods: {
    onSubmit(value) {
      return this.$emit('submit', value)
    }
  }
}
</script>
