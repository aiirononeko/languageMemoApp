<template>
  <div>
    <login-success-notification text="ログインしました" />
    <div class="top">
      <h3 class="name">{{ data.attributes.name }}</h3>
      <nuxt-link to="/user/edit/1"><p>編集する</p></nuxt-link>
    </div>
    <div class="cards">
      <div class="card"/>
    </div>
  </div>
</template>

<script>
import LoginSuccessNotification from "~/components/organisms/notifications/LoginSuccessNotification"

export default {
  components: {
    LoginSuccessNotification
  },

  middleware: "authenticated",

  async asyncData({ $axios, params }) {
    try {
      const { data } = await $axios.$get(`/api/v1/users/${params.id}`)
      return { data }
    } catch (e) {
      console.error(e)
    }
  },
}
</script>

<style scoped lang="scss">
.top {
  background: #f9f9f9;
  height: 100px;
  position: relative;

  .name {
    position: absolute;
    left: 40px;
    top: 10px;
  }
}

.cards {
  margin: 20px auto;
  width: 80%;
  height: 600px;
  border: 1px solid #b2bec3;
}
</style>
