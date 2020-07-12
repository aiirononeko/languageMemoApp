<template>
  <OneColumnContainer>
    <h1 class="main-heading mb-8 text-center">プロフィール編集</h1>

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <SettingProfileCard :errors="errors" :info="info" @save="save" />
      </v-col>
    </v-row>
  </OneColumnContainer>
</template>

<script>
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

  methods: {
    save(userInfo) {
      return this.$emit('save', userInfo)
    }
  }
}
</script>

<style>

</style>
