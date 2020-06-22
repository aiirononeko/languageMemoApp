<template>
  <div>
    <settings-profile-template :errors="errors" :info="info" @save="save"/>
  </div>
</template>

<script>
import User from "@/types/User"
const SettingsProfileTemplate = () => import('~/components/templates/SettingsProfileTemplate')

export default {
  components: {
    SettingsProfileTemplate
  },

  middleware: "authenticated",

  data() {
    return {
      errors: null
    }
  },

  computed: {
    info() {
      return this.$store.getters['authentication/userInfo']
    },

    username() {
      return this.$store.getters['authentication/username']
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

        await this.$router.push(`/${this.username}`)
      } catch (e) {
        if (e.response && e.response.status === 422) {
          this.errors = e.response.data.errors
          return
        }

        return this.$nuxt.error({
          statusCode: e.response.status
        })
      }
    }
  },

  head() {
    return {
      title: "プロフィール編集"
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
