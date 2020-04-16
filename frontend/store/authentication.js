const Cookie = process.client ? require("js-cookie") : undefined;

export const state = () => ({
  access_token: null,
  client: null,
  id: null,
  uid: null,
  isAuthenticated: false,
});

export const getters = {
  access_token: (state) => state.access_token,
  client: (state) => state.client,
  uid: (state) => state.uid,
  id: (state) => state.id,
  isAuthenticated: (state) => state.isAuthenticated,
};

export const mutations = {
  clearUser (state) {
    state.access_token = null;
    state.client = null;
    state.id = null;
    state.uid = null;
    state.isAuthenticated = false;
  },

  setUser (state, res) {
    state.access_token = res.headers["access-token"];
    state.client = res.headers["client"];
    state.id = res.data.data.id;
    state.uid = res.headers["uid"];
    state.isAuthenticated = true;
  },

  setHeader (state, { header, auth_flag }) {
    state.access_token = header["access-token"];
    state.client = header["client"];
    state.uid = header["uid"];
    state.isAuthenticated = auth_flag;
  }
};

export const actions = {

  // ログイン
  async login ({ commit, getters }, { email, password }) {
    try {
      const res = await this.$axios.post(`/api/v1/auth/sign_in`, {
        email,
        password
      })

      commit("setUser", res);

      // Cookieにセット
      Cookie.set("access-token", getters.access_token);
      Cookie.set("client", getters.client);
      Cookie.set("uid", getters.uid);

    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Bad credentials");
      }
      throw new Error("Internal Server Error");
    }
  },

  // ログアウト
  async logout ({ commit }) {
    try {
      const access_token = Cookie.get("access-token");
      const client = Cookie.get("client");
      const uid = Cookie.get("uid");

      await this.$axios.delete(
        `/api/v1/auth/sign_out`,
        {
          headers: {
            "access-token": access_token,
            client: client,
            uid: uid
          }
        }
      );

      commit("clearUser");
      Cookie.remove("access-token");
      Cookie.remove("client");
      Cookie.remove("uid");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Bad credentials");
      }
      throw new Error("Internal Server Error");
    }
  },
};
