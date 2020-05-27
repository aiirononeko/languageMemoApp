<template>
  <div>
    <setting-profile-template :info="info" @save="save"/>
  </div>
</template>

<script>
import SettingProfileTemplate from '~/components/templates/SettingProfileTemplate'

export default {
  components: {
    SettingProfileTemplate
  },

  middleware: "authenticated",

  // TODO: storeから取れるので、あとで削除する
  async asyncData({ $axios, store }) {
    try {
      const { data } = await $axios.$get(`/api/v1/auth/edit`,
      {
        headers: {
          "access-token": store.getters["authentication/accessToken"],
          "client": store.getters["authentication/client"],
          "uid": store.getters["authentication/uid"]
        }
      })
      return { info: data }
    } catch (e) {
      console.error(e)
    }
  },

  computed: {
    // TODO: infoをstoreから取得する
    // info() {
    //   return this.$store.getters['authentication/userInfo']
    // }
  },

  methods: {
    async save(userInfo) {
      try {
        await this.$axios.put(`/api/v1/auth`, {
          name: userInfo.name,
          profile: userInfo.profile,
          address: userInfo.address,
          avatar: userInfo.avatar
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
