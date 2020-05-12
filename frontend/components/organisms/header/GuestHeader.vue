<template>
  <div>
    <!-- ログインしていないユーザーに見せるもの -->
    <header-action-btn text="ログイン" to="/signin" />
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


