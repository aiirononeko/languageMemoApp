<template>
  <one-column-container>
    <h1 class="main-heading mb-8 text-center">新規登録</h1>

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <signup-card v-if="!success" :errors="errors" @signup="onSignup" />

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
const SignupCard = () => import('~/components/organisms/cards/SignupCard')

export default {
  components: {
    OneColumnContainer,
    SignupCard
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
    onSignup(value) {
      this.$emit('signup', value)
    }
  }
}
</script>
