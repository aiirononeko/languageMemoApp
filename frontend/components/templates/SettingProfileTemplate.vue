<template>
  <one-column-container>
    <h1>プロフィール編集</h1>

    <setting-profile-card :info="info" />
  </one-column-container>
</template>

<script>
import OneColumnContainer from '~/components/molecules/containers/OneColumnContainer'
import SettingProfileCard from '~/components/organisms/cards/SettingProfileCard'

export default {
  props: {
    info: {
      type: Object,
      default: undefined
    }
  },

  components: {
    OneColumnContainer,
    SettingProfileCard
  }
}
</script>

<style>

</style>
