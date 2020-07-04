<template>
  <h1>ログイン中...</h1>
</template>

<script>
export default {
  created() {
    const { auth_token, client_id, id, uid, username } = this.$route.query
    const userInfo = { authToken: auth_token, clientId: client_id, id, uid, username }
    this.$store.dispatch("authentication/loginWithSns", { userInfo })
    this.$router.push('/settings/profile')
  }
}
</script>

<style>

</style>