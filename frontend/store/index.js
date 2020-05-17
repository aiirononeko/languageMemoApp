const cookieparser = process.server ? require("cookieparser") : undefined

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (cookieparser !== undefined && req.headers.cookie) {
      try {
        const headers = cookieparser.parse(req.headers.cookie)
        commit("authentication/setHeader", { headers })
      } catch (err) {
        // No valid cookie found
      }
    }
  }
}
