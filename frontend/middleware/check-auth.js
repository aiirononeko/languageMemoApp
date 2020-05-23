// export default async ({ store, req }) => {
//   // ログイン状態でuserInfoがないとき、取得する
//   if (
//     store.getters["authentication/isAuthenticated"] &&
//     !store.getters["authentication/userInfo"]
//   ) {
//     await store.dispatch("authentication/fetchUser")
//   }
// }
