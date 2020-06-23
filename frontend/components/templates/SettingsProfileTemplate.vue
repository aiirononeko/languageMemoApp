<template>
  <one-column-container>
    <h1 class="main-heading mb-8 text-center">プロフィール編集</h1>

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <setting-profile-card :errors="errors" :info="info" @save="save" />
      </v-col>
    </v-row>
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
      return this.$emit('save', userInfo)
    }
  }
}
</script>

<style>

</style>
