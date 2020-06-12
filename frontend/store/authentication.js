import Cookies from "~/utils/Cookie"
import User from "~/types/User"
const cookies = new Cookies()

/**
 * @typedef state
 * @property {String} accessToken
 * @property {String} client
 * @property {Number} id
 * @property {String} uid - UserId
 * @property {String} username - ユーザー名
 * @property {User} userInfo
 */

/**
 * @returns {state}
 */
export const state = () => ({
  accessToken: null,
  client: null,
  id: null,
  uid: null,
  username: null,
  userInfo: null
})

export const getters = {
  accessToken: (state) => state.accessToken,
  client: (state) => state.client,
  uid: (state) => state.uid,
  id: (state) => state.id,
  isAuthenticated: (state) => !!state.uid,
  username: (state) => state.username,
  userInfo: (state) => state.userInfo
}

export const mutations = {
  clearUser (state) {
    state.accessToken = null
    state.client = null
    state.id = null
    state.uid = null
    state.username = null
    state.userInfo = null
  },

  setUser (state, { headers, data }) {
    state.accessToken = headers["access-token"]
    state.client = headers["client"]
    state.id = data.data.id
    state.uid = headers["uid"]
    state.username = data.data.attributes.username
    state.userInfo = new User(data.data)
  },

  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },

  setHeader (state, { headers }) {
    state.accessToken = headers["access-token"]
    state.client = headers["client"]
    state.id = headers["id"]
    state.uid = headers["uid"]
    state.username = headers["username"]
  }
}

export const actions = {

  /**
   * User情報を取得する
   *
   * 目的: cookieのdataからUserInfoを取得する
   */
  async fetchUser ({ commit, getters }) {
    try {
      const { data } = await this.$axios.$get(`/api/v1/users/${getters.username}`)

      commit('setUserInfo', new User(data))
    } catch (e) {
      if (e.response && e.response.status === 401) {
        throw new Error("Bad credentials")
      }
      throw new Error("Internal Server Error")
    }
  },

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
      cookies.set("id", getters.id)
      cookies.set("uid", getters.uid)
      cookies.set("username", getters.username)
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
      cookies.removeAll(["access-token", "client", "id", "uid", "username"])
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Bad credentials")
      }
      throw new Error("Internal Server Error")
    }
  },

  /**
   * username を更新する
   */
  async updateUsername({ commit, getters }, username) {
    const res = await this.$axios.put(`/api/v1/auth`, {
      username
    })

    commit("setUser", res)
    cookies.set("username", getters.username)
  }
}
