import Cookies from "~/utils/Cookies"
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
  canFetchUser: (state) => !!state.uid && !state.userInfo,
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

  setUserWithEmail (state, { headers, data }) {
    state.accessToken = headers["access-token"]
    state.client = headers["client"]
    state.id = data.data.id
    state.uid = headers["uid"]
    state.username = data.data.attributes.username
    state.userInfo = new User(data.data)
  },

  setUserWithSns (state, { userInfo }) {
    state.accessToken = userInfo.authToken
    state.client = userInfo.clientId
    state.uid = userInfo.uid
  },

  setUserInfo (state, userInfo) {
    state.userInfo = userInfo
  },

  setUsername (state, username) {
    state.username = username
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
  async fetchUser ({ commit, dispatch, getters }) {
    try {
      const { data } = await this.$axios.$get(`/api/v1/users/${getters.username}`)

      commit('setUserInfo', new User(data))
    } catch (e) {
      dispatch("removeUserData")

      if (e.response && e.response.status === 401) {
        throw new Error("Bad credentials")
      }
      throw new Error("Internal Server Error")
    }
  },

  /**
   * ログイン
   *
   * バリデーション結果を画面上に表示させたいので、apiとの通信を入れていない。
   */
  loginWithEmail ({ commit, getters }, { headers, data }) {
    commit("setUserWithEmail", { headers, data })

    // Cookieにセット
    cookies.set("access-token", getters.accessToken, { path: "/" })
    cookies.set("client", getters.client, { path: "/" })
    cookies.set("id", getters.id, { path: "/" })
    cookies.set("uid", getters.uid, { path: "/" })
    cookies.set("username", getters.username, { path: "/" })
  },

  loginWithSns ({ commit, getters }, { userInfo }) {
    commit("setUserWithSns", { userInfo })

    cookies.set("access-token", getters.accessToken, { path: "/" })
    cookies.set("client", getters.client, { path: "/" })
    cookies.set("id", getters.id, { path: "/" })
    cookies.set("uid", getters.uid, { path: "/" })
    cookies.set("username", getters.username, { path: "/" })
  },

  // ログアウト
  async logout ({ dispatch }) {
    try {
      await this.$axios.$delete(`/api/v1/auth/sign_out`)

      dispatch("removeUserData")
    } catch (e) {
      dispatch("removeUserData")

      if (e.response && e.response.status === 401) {
        throw new Error("Bad credentials")
      }
      throw new Error("Internal Server Error")
    }
  },

  // アカウント削除
  async deactivate ({ dispatch }) {
    try {
      const data = await this.$axios.$delete(`/api/v1/auth`)

      dispatch("removeUserData")

      return data
    } catch (e) {

      dispatch("removeUserData")

      if (e.response && e.response.status === 401) {
        throw new Error("Bad credentials")
      }
      throw new Error("Internal Server Error")
    }
  },

  /**
   * User情報を削除する
   */
  removeUserData ({ commit }) {
    commit("clearUser")
    cookies.removeAll(["access-token", "client", "id", "uid", "username"], {
      path: "/",
    })
  },

  /**
   * username を更新する
   */
  updateUsername ({ commit, getters }, username) {
    commit("setUsername", username)
    cookies.set("username", getters.username, { path: "/" })
  }
}
