export default ({ store, redirect }) => {
  // ユーザーが認証されているとき
  if (store.getters["authentication/isAuthenticated"]) {
    return redirect('/settings/profile')
  }
}
