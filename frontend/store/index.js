import Cookies from '@/utils/Cookies'
import * as typesCookie from '@/types/Cookie'

export const actions = {
  async nuxtClientInit ({ getters, commit, dispatch }) {
    const cookies = new Cookies()
    const names = typesCookie.AUTH_DATA
    // Cookieのデータがおかしくないかを確認する
    if (!cookies.isCookiesDefined(names)) {
      cookies.removeAll(names)
      return
    }

    commit("authentication/setHeader", { headers: cookies.cookies })
    if (getters["authentication/canFetchUser"]) {
      await dispatch("authentication/fetchUser")
    }
  }
}
