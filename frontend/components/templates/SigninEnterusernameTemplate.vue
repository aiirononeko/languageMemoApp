<template>
  <one-column-container>
    <change-username-card @submit="submit" />
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

  methods: {
    submit(userName) {
      this.$emit('submit', userName)
    }
  }
}
</script>

<style>

</style>
