<template>
  <v-card class="d-flex flex-column justify-center align-center mx-auto username-card" max-width="500" height="300">
    <p class="mb-5">ユーザーIDを入力してください</p>

    <change-username-form :errors="errors" :username="username" @submit="onSubmit" />
  </v-card>
</template>

<script>
import ChangeUsernameForm from '~/components/organisms/form/ChangeUsernameForm'

export default {
  components: {
    ChangeUsernameForm
  },

  props: {
    errors: {
      type: Object,
      default: undefined
    },

    username: {
      type: String,
      default: undefined
    }
  },

  methods: {
    onSubmit(userName) {
      this.$emit('submit', userName)
    }
  }
}
</script>
