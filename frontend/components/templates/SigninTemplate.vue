<template>
  <OneColumnContainer>
    <h1 class="main-heading mb-8 text-center">ログイン</h1>

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <SigninCard :errors="errors" @signin="onSignin" @snsauth="onSnsauth" />
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
