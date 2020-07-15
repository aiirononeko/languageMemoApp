<template>
  <SettingsProfileTemplate :errors="errors" :info="info" @save="save"/>
</template>

<script>
import User from "@/types/User"
import { objectToFormData } from "object-to-formdata"

export default {
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
     * @param {import('@/types/User').default} userInfo
     */
    async save(userInfo) {
      this.errors = null

      try {
        const formData = objectToFormData(userInfo)
        const { data } = await this.$axios.$put(`/api/v1/auth`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }})

        this.$store.commit("authentication/setUserInfo", new User(data))

        await this.$router.push(`/${this.username}`)
      } catch (e) {
        const statusCode = e.response && e.response.status || 500

        if (statusCode === 422) {
          this.errors = e.response.data.errors
          return
        }

        return this.$nuxt.error({ statusCode })
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
