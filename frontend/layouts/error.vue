<template>
  <v-container class="main-heading text-center">
    <div class="mt-2 mt-sm-4">
      <h1 class="error-code" id="errorStatusCode">{{ error.statusCode }}</h1>

      <h2 class="mb-2">{{ title }}</h2>

      <h3 class="mb-2">{{ message }}</h3>

      <p class="mb-2"><nuxt-link to="/">Home</nuxt-link></p>

      <template v-if="error.statusCode === 401 || error.statusCode === 403">
        <p class="mb-2"><nuxt-link to="/signin">ログイン</nuxt-link></p>
        <p class="mb-2"><nuxt-link to="/signup">新規会員登録</nuxt-link></p>
      </template>
    </div>
  </v-container>
</template>

<script>
import { getErrorMessage } from "~/utils/errors"

export default {
  props: ['error'],

  computed: {
    /**
     * @return {String}
     */
    title() {
      return this.errorMessageObj.title
    },

    /**
     * Error Messageを取得
     *
     * @return {String}
     */
    message() {
      return this.errorMessageObj.message
    },

    errorMessageObj() {
      return getErrorMessage(this.error.statusCode)
    }
  }
}
</script>

<style scoped lang="scss">
.error-code {
  font-size: 3rem;
}
</style>
