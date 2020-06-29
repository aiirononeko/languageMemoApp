<template>
  <one-column-container>
    <h1 id="p-1" class="main-heading mb-8 text-center">プロフィール編集</h1>

    <setting-profile-card :errors="errors" :info="info" @save="save" />
  </one-column-container>
</template>

<script>
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')
const SettingProfileCard = () => import('~/components/organisms/cards/SettingProfileCard')

export default {
  props: {
    errors: {
      type: Object,
      default: undefined
    },

    info: {
      type: Object,
      default: undefined
    }
  },

  components: {
    OneColumnContainer,
    SettingProfileCard
  },

  methods: {
    save(userInfo) {
      this.$emit('save', userInfo)
    }
  }
}
</script>

<style>

</style>
