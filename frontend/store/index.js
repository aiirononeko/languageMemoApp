import Cookies from '@/utils/Cookies'

export const actions = {
  async nuxtClientInit ({ getters, commit, dispatch }) {
    const cookies = new Cookies()
    const names = ['access-token', 'client', 'uid', 'id', 'username']
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
