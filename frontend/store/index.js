const cookieparser = process.server ? require("cookieparser") : undefined;

export const state = () => {
  return {
    access_token: "",
    uid: "",
    client: "",
    id: "",
    isAuthenticated: false,
    text: ""
  };
};
export const mutations = {
  setUser(state, res) {
    state.access_token = res.headers["access-token"];
    state.uid = res.headers["uid"];
    state.client = res.headers["client"];
    state.id = res.data.data.id;
    state.isAuthenticated = true;
  },
  setHeader(state, { header, auth_flag }) {
    state.access_token = header["access-token"];
    state.uid = header["uid"];
    state.client = header["client"];
    state.isAuthenticated = auth_flag;
  },
  logoutUser(state) {
    state.access_token = null;
    state.isAuthenticated = false;
    state.uid = null;
    state.client = null;
    state.id = null;
  },
  setMessage: (state, payload) => {
    state.text = payload.text; // stateの状態を変更する
  }
};

export const actions = {
  async login({ commit }, { email, password }) {
    try {
      await this.$axios
        .post(`${this.$axios.defaults.baseURL}/api/v1/auth/sign_in`, {
          email,
          password
        })
        .then(res => {
          commit("setUser", res);
        });
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Bad credentials");
      }
      throw error;
    }
  },
  async logout({ commit }, { access_token, client, uid }) {
    try {
      await this.$axios.delete(
        `${this.$axios.defaults.baseURL}/api/v1/auth/sign_out`,
        {
          headers: {
            "access-token": access_token,
            client: client,
            uid: uid
          }
        }
      );
      commit("logoutUser");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error("Bad credentials");
      }
      throw error;
    }
  },

  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        const auth_flag = parsed.uid ? true : false;
        commit("setHeader", { header: parsed, auth_flag });
      } catch (err) {
        // No valid cookie found
      }
    }
  },
  async showFlashMessage({ commit }, message) {
    commit("setMessage", message); //mutationに値を渡す
  }
};
