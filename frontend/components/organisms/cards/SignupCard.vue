<template>
  <v-card class="d-flex flex-column align-center justify-center mx-auto" width="500" height="350">
    <h2 class="mb-5">Poeta</h2>
    <signup-form @signup="signup" />
  </v-card>
</template>

<script>
import SignupForm from '~/components/organisms/form/SignupForm'

export default {
  components: {
    SignupForm
  },

  methods: {
    signup(userInfo) {
      this.$emit('signup', userInfo)
    }
  }
}
</script>

<style>

</style>
