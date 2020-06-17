<template>
  <one-column-container>
    <change-username-card
      :errors="errors"
      :username="username"
      @submit="onSubmit"
    />
  </one-column-container>
</template>

<script>
import ChangeUsernameCard from '~/components/organisms/cards/ChangeUsernameCard'
import OneColumnContainer from '~/components/molecules/containers/OneColumnContainer'

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
