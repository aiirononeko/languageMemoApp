export default ({ $axios , store: { getters } }) => {
  $axios.onRequest(config => {
    if (getters["authentication/isAuthenticated"]) {
      config.headers.common["access-token"] = getters["authentication/accessToken"]
      config.headers.common["client"] = getters["authentication/client"]
      config.headers.common["uid"] = getters["authentication/uid"]
    }
  })
}
