import Cookies from '~/utils/Cookies'

export const actions = {
  async nuxtServerInit ({ getters, commit, dispatch }, { req }) {
    if (req.headers.cookie) {
      const cookies = new Cookies(req.headers.cookie)
      const names = ['access-token', 'client', 'uid', 'id', 'username']
      // Cookieのデータがおかしくないかを確認する
      if (!cookies.isCookiesDefined(names)) {
        cookies.removeAll(names)
        return
      }

      commit("authentication/setHeader", { headers: cookies.cookies })
      if (
        getters["authentication/isAuthenticated"] &&
        !getters["authentication/userInfo"]
      ) {
        await dispatch("authentication/fetchUser")
      }
    }
  }
}
