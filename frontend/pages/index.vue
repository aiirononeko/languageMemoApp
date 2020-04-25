<template>
  <div class="container">
    <div>
      <p>{{ uid }} : {{ accessToken }} : {{ isAuthenticated }}</p>
      <app-logo/>
      <h1 class="title">
        frontend
      </h1>
      <h2 class="subtitle">
        Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </div>
</template>

<script>
import AppLogo from '~/components/atoms/icons/AppLogo.vue'

export default {
  components: {
    AppLogo
  },

  computed: {
    accessToken() {
      return this.$store.getters["authentication/accessToken"]
    },

    isAuthenticated() {
      return this.$store.getters["authentication/isAuthenticated"]
    },

    uid() {
      return this.$store.getters["authentication/uid"]
    },
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

