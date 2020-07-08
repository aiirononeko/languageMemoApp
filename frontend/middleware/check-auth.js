export default async ({ store: { dispatch, getters } }) => {
  // ログイン状態でuserInfoがないとき、取得する
  if (getters["authentication/canFetchUser"]) {
    await dispatch("authentication/fetchUser")
  }
}
