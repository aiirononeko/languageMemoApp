<template>
  <h1>ログイン中...</h1>
</template>

<script>
export default {
  created() {
    const { auth_token, client_id, id, uid, username } = this.$route.query
    const userInfo = { authToken: auth_token, clientId: client_id, id, uid, username }
    this.$store.dispatch("authentication/loginWithSns", { userInfo })
    const redirectPath = this.redirectPath
    this.setFromSecondTimeLogin()
    this.$router.push(redirectPath)
  },

  computed: {
    redirectPath() {
        const isFromSecondTimeLogin = window.localStorage.getItem('isFromSecondTimeLogin')
        return isFromSecondTimeLogin !== 'true' ? '/settings/user-name' : '/settings/profile'
    }
  },

  methods: {
    /**
     * 2回目以降のログイン判定のために、
     * ローカルストレージに判定用の値({ 'isFromSecondTimeLogin': 'true' })を入れる
     */
    setFromSecondTimeLogin() {
      if (window.localStorage) {
        window.localStorage.setItem('isFromSecondTimeLogin', 'true')
      }
    }
  }
}
</script>

<style>

</style>