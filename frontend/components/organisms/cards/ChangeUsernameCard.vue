<template>
  <v-card class="d-flex flex-column justify-center align-center mx-auto username-card" max-width="500" height="300">
    <p class="mb-5">ユーザーIDを入力してください</p>
    <p class="mb-5">※半角英数字とアンダーバー(_)のみ使用可能です。</p>

    <change-username-form :username="username" @submit="onSubmit" />
  </v-card>
</template>

<script>
import ChangeUsernameForm from '~/components/organisms/form/ChangeUsernameForm'

export default {
  components: {
    ChangeUsernameForm
  },

  props: {
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
