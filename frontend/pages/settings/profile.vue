<template>
  <div>
    <setting-profile-template :info="info"/>
  </div>
</template>

<script>
import SettingProfileTemplate from '~/components/templates/SettingProfileTemplate'

export default {
  components: {
    SettingProfileTemplate
  },

  middleware: "authenticated",

  async asyncData({ $axios, params }) {
    try {
      const { data } = await $axios.$get(`/api/v1/auth/edit`)
      return { info: data }
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
