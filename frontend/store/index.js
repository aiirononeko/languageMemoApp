import Cookies from 'universal-cookie'
import { isCookieUndefined } from "~/utils/cookie"

export const actions = {
  async nuxtServerInit ({ commit }, { req }) {
    if (req.headers.cookie) {
      const cookies = new Cookies(req.headers.cookie)
      const names = ['access-token', 'client', 'uid', 'id', 'username']
      // Cookieのデータがおかしくないかを確認する
      if (isCookieUndefined(cookies, names)) {
        return
      }

      commit("authentication/setHeader", { headers: cookies.cookies })
      await store.dispatch("authentication/fetchUser")
    }
  }
}
