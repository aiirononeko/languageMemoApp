<template>
  <one-column-container>
    <h1 id="p-1" class="main-heading mb-8 text-center">パスワードをリセットする</h1>

    <v-row justify="center">
      <v-col cols="12" sm="8">
        <password-reset-card v-if="!success" :errors="errors" @submit="onSubmit" />

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
  </one-column-container>
</template>

<script>
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')
const PasswordResetCard = () => import('~/components/organisms/cards/PasswordResetCard')

export default {
  components: {
    OneColumnContainer,
    PasswordResetCard
  },

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
