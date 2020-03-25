<template>
  <v-app>
    <showNotification></showNotification>
    <div class="top">
      <h3 class="name">{{ data.data.attributes.name }}</h3>
      <nuxt-link to="/user/edit/1"><p>編集する</p></nuxt-link>
    </div>
    <div class="cards">
      <div class="card"></div>
    </div>
  </v-app>
</template>

<script>
import showNotification from "~/components/material/show-notification";

export default {
  middleware: "authenticated",
  asyncData({ $axios, params }) {
    return $axios
      .$get(`${$axios.defaults.baseURL}/api/v1/users/${params.id}`)
      .then(res => {
        return { data: res };
      });
  },
  components: {
    showNotification
  }
};
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
