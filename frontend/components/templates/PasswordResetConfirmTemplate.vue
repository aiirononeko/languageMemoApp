<template>
  <one-column-container>
    <h1 class="main-heading mb-8 text-center">新しいパスワードを入力してください</h1>

    <v-row justify="center">
      <v-col cols="12" sm="8">
        <password-reset-confirm-card v-if="!success" @submit="onSubmit" />

        <v-alert
          border="top"
          colored-border
          type="success"
          elevation="2"
          v-else
        >
          {{ message }}
          <div class="text-right">
            <nuxt-link to="/signin">ログインへ</nuxt-link>
          </div>
        </v-alert>
      </v-col>
    </v-row>
  </one-column-container>
</template>

<script>
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')
const PasswordResetConfirmCard = () => import('~/components/organisms/cards/PasswordResetConfirmCard')

export default {
  components: {
    OneColumnContainer,
    PasswordResetConfirmCard
  },

  props: {
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
