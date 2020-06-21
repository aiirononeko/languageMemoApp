<template>
  <one-column-container>
    <h1 class="main-heading mb-8 text-center">ログイン</h1>

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <signin-card :errors="errors" @signin="onSignin" @snsauth="onSnsauth" />
      </v-col>
    </v-row>
  </one-column-container>
</template>

<script>
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')
const SigninCard = () => import('~/components/organisms/cards/SigninCard')

export default {
  components: {
    OneColumnContainer,
    SigninCard
  },

  props: {
    errors: {
      type: Object,
      default: undefined
    }
  },

  methods: {
    onSignin(value) {
      return this.$emit('signin', value)
    },

    onSnsauth(value) {
      return this.$emit('snsauth', value)
    }
  }
}
</script>
