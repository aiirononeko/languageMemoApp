<template>
  <v-card class="d-flex flex-column justify-center align-center mx-auto username-card" max-width="500" height="300">
    <p class="mb-5">ユーザーIDを入力してください</p>
    <p class="mb-5">※半角英数字とアンダーバー(_)のみ使用可能です。</p>

    <change-username-form @submit="onSubmit" />
  </v-card>
</template>

<script>
import ChangeUsernameForm from '~/components/organisms/form/ChangeUsernameForm'

export default {
  components: {
    ChangeUsernameForm
  },

  methods: {
    onSubmit(userName) {
      this.$emit('submit', userName)
    }
  }
}
</script>

<style>
.username-card {
  position: relative;
}

.next-btn {
  color: white;
  background-color: #FDCB6E;
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
