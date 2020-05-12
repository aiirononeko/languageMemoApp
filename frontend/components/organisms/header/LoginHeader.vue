<template>
  <div>
    <!-- ログインしたユーザーに見せるもの -->
    <header-action-btn text="ログアウト" @click="logout" />
  </div>
</template>

<script>
const HeaderActionBtn = () => import('~/components/molecules/btns/HeaderActionBtn')

export default {
  components: {
    HeaderActionBtn
  },

  methods: {
    async logout() {
      try {
        await this.$store.dispatch("authentication/logout")

        this.$router.push(`/signin`)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
