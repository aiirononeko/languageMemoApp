import Cookies from "universal-cookie"
const cookies = new Cookies()

export const state = () => ({
  accessToken: null,
  client: null,
  id: null,
  uid: null,
  isAuthenticated: false,
})

export const getters = {
  accessToken: (state) => state.accessToken,
  client: (state) => state.client,
  uid: (state) => state.uid,
  id: (state) => state.id,
  isAuthenticated: (state) => state.isAuthenticated,
}

export const mutations = {
  clearUser (state) {
    state.accessToken = null
    state.client = null
    state.id = null
    state.uid = null
    state.isAuthenticated = false
  },

  setUser (state, res) {
    state.accessToken = res.headers["access-token"]
    state.client = res.headers["client"]
    state.id = res.data.data.id
    state.uid = res.headers["uid"]
    state.isAuthenticated = true
  },

  setHeader (state, { header, auth_flag }) {
    state.accessToken = header["access-token"]
    state.client = header["client"]
    state.uid = header["uid"]
    state.isAuthenticated = auth_flag
  }
}

export const actions = {

  // ログイン
  async login ({ commit, getters }, { email, password }) {
    try {
      const res = await this.$axios.post(`/api/v1/auth/sign_in`, {
        email,
        password
      })

      commit("setUser", res)

      // Cookieにセット
      cookies.set("access-token", getters.accessToken)
      cookies.set("client", getters.client)
      cookies.set("uid", getters.uid)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Bad credentials")
      }
      throw new Error("Internal Server Error")
    }
  },

  // ログアウト
  async logout ({ commit, getters }) {
    try {
      await this.$axios.delete(
        `/api/v1/auth/sign_out`,
        {
          headers: {
            "access-token": getters.accessToken,
            client: getters.client,
            uid: getters.uid

          }
        }
      )

      commit("clearUser")
      cookies.remove("access-token")
      cookies.remove("client")
      cookies.remove("uid")
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Bad credentials")
      }
      throw new Error("Internal Server Error")
    }
  },
}
