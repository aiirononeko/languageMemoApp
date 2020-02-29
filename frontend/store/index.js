
import axios from 'axios'
const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    access_token: '',
    uid: '',
    client: '',
    id: '',
    isAuthenticated: false,
    text: '', 
  }
}
export const mutations = {
  setUser (state, res) {
    state.access_token = res.headers['access-token']
    state.uid = res.headers['uid']
    state.client = res.headers['client']
    state.id = res.data.data.id
    state.isAuthenticated = true
  },
  setHeader (state, header) {
    state.access_token = header['access-token']
    state.uid = header['uid']
    state.client = header['client']
    state.isAuthenticated = true
  },
  logoutUser (state) {
    state.access_token = null;
    state.isAuthenticated = null;
    state.uid = null;
    state.client = null;
    state.id = null;
  },
  setMessage: (state, payload) => {
    state.text = payload.text; // stateの状態を変更する
  }
}

export const actions = {
    async login ({ commit }, { email, password }) {
      try {
        await axios.post('http://localhost:3000/api/v1/auth/sign_in', { email, password }
        ).then(res => {
            // console.log(res)
            // console.log(res.data.data.uid)
            commit('setUser', res)
        })
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },
    async logout ({ commit }, {access_token, client, uid}) {
      try {
        await  axios.delete('http://localhost:3000/api/v1/auth/sign_out', {
          headers: {
            "access-token": access_token,
            client: client,
            uid: uid
          }
        })
        commit('logoutUser')
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },
    
    nuxtServerInit ({ commit }, { req }) {
      if (req.headers.cookie) {
        const parsed = cookieparser.parse(req.headers.cookie)
        try {
          console.log(parsed)
          commit('setHeader', parsed)
        } catch (err) {
          // No valid cookie found
        }
      }
    },
    async showFlashMessage({commit}, message) {
      commit('setMessage', message); //mutationに値を渡す
    }
  }
