<template>
  <v-card class="pt-10 px-6 pb-8">
    <h2 class="mb-3 text-center">ユーザーIDを入力</h2>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <change-username-form :errors="errors" :username="username" @submit="onSubmit" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const ChangeUsernameForm = () => import('~/components/organisms/form/ChangeUsernameForm')

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
