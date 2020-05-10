<template>
  <div>
    <signin-enterusername-template @submit="submit"/>
  </div>
</template>

<script>
import SigninEnterusernameTemplate from '~/components/templates/SigninEnterusernameTemplate'

export default {
  components: {
    SigninEnterusernameTemplate
  },

  methods: {
    async submit(userName) {
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
  },

  middleware: "authenticated"
}
</script>

<style lang="scss" scoped>

</style>
