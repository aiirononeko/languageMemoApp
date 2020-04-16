const cookieparser = process.server ? require("cookieparser") : undefined;

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        const auth_flag = parsed.uid ? true : false;
        commit("authentication/setHeader", { header: parsed, auth_flag });
      } catch (err) {
        // No valid cookie found
      }
    }
  }
};
