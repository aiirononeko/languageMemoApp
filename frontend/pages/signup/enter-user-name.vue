<template>
  <div>
    <signin-enterusername-template @submit="updateUsername"/>
  </div>
</template>

<script>
import SigninEnterusernameTemplate from '~/components/templates/SigninEnterusernameTemplate'

export default {
  components: {
    SigninEnterusernameTemplate
  },

  middleware: "authenticated",

  methods: {
    async updateUsername(userName) {
      try {
        console.log("submit")
        // TODO: この部分の処理はまだ確認していない。確認メールのURLのリダイレクトが変更されたら確認する

        // await this.$axios.put(`/api/v1/auth`, {
        //   username: userName,
        // })

        this.$router.push(`/settings/profile`)
      } catch (error) {
        console.error(error)
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
