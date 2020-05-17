import Cookies from 'universal-cookie'

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.headers.cookie) {
      try {
        const { cookies } = new Cookies(req.headers.cookie)
        commit("authentication/setHeader", { headers: cookies })
      } catch (err) {
        // No valid cookie found
      }
    }
  }
}
