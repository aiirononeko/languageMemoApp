import Vuex from 'vuex';
import * as index from '~/store/index';
import { createLocalVue } from '@vue/test-utils';
import cloneDeep from 'lodash.clonedeep';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('store/index.js', () => {
  let store;

  // mockのVueインスタンスを生成
  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(index))
  })

  describe('mutaions', () => {
    it('setUserの正常系', () => {
      expect(store.getters.access_token).toBeNull();
      expect(store.getters.client).toBeNull();
      expect(store.getters.id).toBeNull();
      expect(store.getters.uid).toBeNull();
      expect(store.getters.isAuthenticated).toBeFalsy();

      const res = {
        headers: {
          "access-token": "2RvvBof6HGQ-C__vaMQ5Wq",
          uid: "hoge@example.com",
          client: "NQqnvItfl_4F9V_l2gzIla",
        },
        data: { data: { id: "1" } }
      };
      store.commit('setUser', res);

      expect(store.getters.access_token).toBe("2RvvBof6HGQ-C__vaMQ5Wq");
      expect(store.getters.client).toBe("NQqnvItfl_4F9V_l2gzIla");
      expect(store.getters.id).toBe("1");
      expect(store.getters.uid).toBe("hoge@example.com");
      expect(store.getters.isAuthenticated).toBeTruthy();
    }),

    it('setHeaderの正常系', () => {
      expect(store.getters.access_token).toBeNull();
      expect(store.getters.client).toBeNull();
      expect(store.getters.uid).toBeNull();
      expect(store.getters.isAuthenticated).toBeFalsy();

      const parsedCookie = {
        "access-token": "2RvvBof6HGQ-C__vaMQ5Wq",
        uid: "hoge@example.com",
        client: "NQqnvItfl_4F9V_l2gzIla",
      };

      store.commit('setHeader', { header: parsedCookie, auth_flag: true });

      expect(store.getters.access_token).toBe("2RvvBof6HGQ-C__vaMQ5Wq");
      expect(store.getters.client).toBe("NQqnvItfl_4F9V_l2gzIla");
      expect(store.getters.uid).toBe("hoge@example.com");
      expect(store.getters.isAuthenticated).toBeTruthy();
    })

    it('clearUserの正常系', () => {
      expect(store.getters.access_token).toBeNull();
      expect(store.getters.client).toBeNull();
      expect(store.getters.id).toBeNull();
      expect(store.getters.uid).toBeNull();
      expect(store.getters.isAuthenticated).toBeFalsy();

      const res = {
        headers: {
          "access-token": "2RvvBof6HGQ-C__vaMQ5Wq",
          uid: "hoge@example.com",
          client: "NQqnvItfl_4F9V_l2gzIla",
        },
        data: { data: { id: "1" } }
      };
      store.commit('setUser', res);

      expect(store.getters.access_token).toBe("2RvvBof6HGQ-C__vaMQ5Wq");
      expect(store.getters.client).toBe("NQqnvItfl_4F9V_l2gzIla");
      expect(store.getters.id).toBe("1");
      expect(store.getters.uid).toBe("hoge@example.com");
      expect(store.getters.isAuthenticated).toBeTruthy();

      store.commit('clearUser');
      expect(store.getters.access_token).toBeNull();
      expect(store.getters.client).toBeNull();
      expect(store.getters.id).toBeNull();
      expect(store.getters.uid).toBeNull();
      expect(store.getters.isAuthenticated).toBeFalsy();
    })
  })
});
