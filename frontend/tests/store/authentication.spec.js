import Vuex from 'vuex'
import axios from 'axios'
import * as authentication from '~/store/authentication'
import { createLocalVue } from '@vue/test-utils'
import cloneDeep from 'lodash.clonedeep'

const localVue = createLocalVue()
localVue.use(Vuex)

// axiosのmock
let mockAxiosGetResult // Axiosで発生させる戻り値
let mockAxiosError = false // Errorを発生させるかどうか
jest.mock('axios', () => ({
  post: jest.fn(() => {
    if (mockAxiosError) {
      return Promise.reject(mockAxiosGetResult)
    }

    return Promise.resolve(mockAxiosGetResult)
  }),
  delete: jest.fn(() => {
    if (mockAxiosError) {
      return Promise.reject(mockAxiosGetResult)
    }

    return Promise.resolve(mockAxiosGetResult)
  })
}))

describe('store/authentication.js', () => {
  let store

  // mockのVueインスタンスを生成
  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(authentication))
  })

  describe('mutaions', () => {
    it('setHeaderの正常系', () => {
      expect(store.getters.accessToken).toBeNull()
      expect(store.getters.client).toBeNull()
      expect(store.getters.uid).toBeNull()
      expect(store.getters.isAuthenticated).toBeFalsy()

      const parsedCookie = {
        "access-token": "2RvvBof6HGQ-C__vaMQ5Wq",
        uid: "hoge@example.com",
        client: "NQqnvItfl_4F9V_l2gzIla",
      }

      store.commit('setHeader', { headers: parsedCookie })

      expect(store.getters.accessToken).toBe("2RvvBof6HGQ-C__vaMQ5Wq")
      expect(store.getters.client).toBe("NQqnvItfl_4F9V_l2gzIla")
      expect(store.getters.uid).toBe("hoge@example.com")
      expect(store.getters.isAuthenticated).toBeTruthy()
    })

    it('setUserWithEmailとclearUserの正常系', () => {
      expect(store.getters.accessToken).toBeNull()
      expect(store.getters.client).toBeNull()
      expect(store.getters.id).toBeNull()
      expect(store.getters.uid).toBeNull()
      expect(store.getters.isAuthenticated).toBeFalsy()

      const res = {
        headers: {
          "access-token": "2RvvBof6HGQ-C__vaMQ5Wq",
          uid: "hoge@example.com",
          client: "NQqnvItfl_4F9V_l2gzIla",
        },
        data: { data: { id: "1", attributes: { username: "ApeE8e4ka" } } }
      }
      store.commit('setUserWithEmail', res)

      expect(store.getters.accessToken).toBe("2RvvBof6HGQ-C__vaMQ5Wq")
      expect(store.getters.client).toBe("NQqnvItfl_4F9V_l2gzIla")
      expect(store.getters.id).toBe("1")
      expect(store.getters.uid).toBe("hoge@example.com")
      expect(store.getters.isAuthenticated).toBeTruthy()

      store.commit('clearUser')
      expect(store.getters.accessToken).toBeNull()
      expect(store.getters.client).toBeNull()
      expect(store.getters.id).toBeNull()
      expect(store.getters.uid).toBeNull()
      expect(store.getters.isAuthenticated).toBeFalsy()
    })
  })

  describe('actions', () => {

    beforeEach(() => {
      store.$axios = axios // @nuxtjs/axiosの代わりにaxiosを注入
      mockAxiosError = false // テストをする前に、falseに戻す。
    })

    // TODO: login に対するテストを書く

    // TOO: logout に対するテストを書く
  })
})
