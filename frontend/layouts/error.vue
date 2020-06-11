<template>
  <v-container class="main-heading text-center">
    <div class="mt-2 mt-sm-4">
      <h1 class="error-code">{{ error.statusCode }}</h1>

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
const defaultErrorMessages = {
  401: {
    title: "Unauthorized",
    message: "認証ができていません"
  },

  403: {
    title: "Forbidden",
    message: "ページを見る権限がありません"
  },

  404: {
    title: "Page Not Found",
    message: "ページが存在しません"
  },

  500: {
    title: "Internal Server Error",
    message: "エラーが発生しました"
  },
}

/**
 * @param {String|Number|null} statusCode
 * @return {{title: string, message: string}}
 */
const getErrorMessage = (statusCode = null) => {
  statusCode = String(statusCode) || "500" // statusCodeがnullのとき、500にする。

  for (const v in defaultErrorMessages) {
    if (v === statusCode) {
      return defaultErrorMessages[v]
    }
  }

  return defaultErrorMessages["500"]
}


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
