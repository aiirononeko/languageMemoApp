<template>
  <one-column-container>
    <change-username-card :username="username" @submit="onSubmit" />
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
