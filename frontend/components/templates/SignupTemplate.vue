<template>
  <one-column-container>
    <h1 class="main-heading mb-8 text-center">新規登録</h1>

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <signup-card @signup="onSignup" />
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

  methods: {
    onSignup(value) {
      this.$emit('signup', value)
    }
  }
}
</script>
