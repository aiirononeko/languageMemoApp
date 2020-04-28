<template>
  <div>
    <!-- ログインしていないユーザーに見せるもの -->
    <header-action-btn text="ログイン" to="/user/login" />
  </div>
</template>

<script>
const HeaderActionBtn = () => import('~/components/molecules/btns/HeaderActionBtn')

export default {
  components: {
    HeaderActionBtn
  }
}
</script>


