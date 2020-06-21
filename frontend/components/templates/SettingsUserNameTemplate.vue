<template>
  <one-column-container>
    <h1 class="main-heading mb-8 text-center">ユーザーIDの変更</h1>

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <change-username-card
          :errors="errors"
          :username="username"
          @submit="onSubmit"
        />
      </v-col>
    </v-row>
  </one-column-container>
</template>

<script>
const ChangeUsernameCard = () => import('~/components/organisms/cards/ChangeUsernameCard')
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')

export default {
  components: {
    ChangeUsernameCard,
    OneColumnContainer
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

<style>

</style>
