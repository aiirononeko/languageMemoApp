import Cookies from 'universal-cookie'

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    if (req.headers.cookie) {
      try {
        const { cookies } = new Cookies(req.headers.cookie)

        commit("authentication/setHeader", { headers: cookies })
        await store.dispatch("authentication/fetchUser")
      } catch (err) {
        // No valid cookie found
      }
    }
  }
}
