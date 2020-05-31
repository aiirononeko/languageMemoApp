<template>
  <div>
    <setting-profile-template :info="info" @save="save"/>
  </div>
</template>

<script>
import SettingProfileTemplate from '~/components/templates/SettingProfileTemplate'
import User from "@/types/User"

export default {
  components: {
    SettingProfileTemplate
  },

  middleware: "authenticated",

  computed: {
    info() {
      return this.$store.getters['authentication/userInfo']
    }
  },

  methods: {

    /**
     * @param {import('~/types/User').default} userInfo
     */
    async save(userInfo) {
      try {
        const { data } = await this.$axios.$put(`/api/v1/auth`, {
          name: userInfo.name,
          profile: userInfo.profile,
          address: userInfo.address,
          avatar: userInfo.avatar,
          image: userInfo.image
        })

        this.$store.commit("authentication/setUserInfo", new User(data))
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
