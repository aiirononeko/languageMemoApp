
import axios from 'axios'
// const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    access_token: null,
    uid: null,
    id: ''
  }
}
export const mutations = {
  setUser (state, res) {
    state.access_token = res.headers['access-token']
    state.uid = res.data.data.uid
    state.id = res.data.data.id
    // state.client
  }
}

export const actions = {
    async login ({ commit }, { email, password }) {
      try {
        await axios.post('http://localhost:3000/api/v1/auth/sign_in', { email, password }
        ).then(res => {
            console.log(res)
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
  
  }
