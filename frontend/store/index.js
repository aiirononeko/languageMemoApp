const CookieParser = process.server ? require("cookieparser") : undefined

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (CookieParser !== undefined && req.headers.cookie) {
      try {
        const headers = CookieParser.parse(req.headers.cookie)
        commit("authentication/setHeader", { headers })
      } catch (err) {
        // No valid cookie found
      }
    }
  }
}
