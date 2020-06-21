export default async ({ store }) => {
  // ログイン状態でuserInfoがないとき、取得する
  if (store.getters["authentication/canFetchUser"]) {
    await store.dispatch("authentication/fetchUser")
  }
}
