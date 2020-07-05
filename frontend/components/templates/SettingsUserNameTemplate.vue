<template>
  <one-column-container>
    <h1 class="main-heading mb-8 text-center">{{ pageTitle }}</h1>

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <change-username-card
          :errors="errors"
          :username="username"
          :is-first-time-login="isFirstTimeLogin"
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

    isFirstTimeLogin: {
      type: Boolean,
      default: false
    },

    username: {
      type: String,
      default: undefined
    }
  },

  computed: {
    pageTitle() {
      return this.isFirstTimeLogin ? 'ユーザーIDを決めよう' : 'ユーザーIDの変更'
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
