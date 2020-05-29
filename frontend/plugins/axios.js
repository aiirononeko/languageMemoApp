export default ({ $axios , store }) => {
  $axios.onRequest(config => {
    if (store.getters["authentication/isAuthenticated"]) {
      config.headers.common["access-token"] = store.getters["authentication/accessToken"]
      config.headers.common["uid"] = store.getters["authentication/uid"]
      config.headers.common["client"] = store.getters["authentication/client"]
    }
  })
}
