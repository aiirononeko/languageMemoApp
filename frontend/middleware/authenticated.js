export default ({ store, redirect }) => {
    // ユーザーが認証されていないとき
  if (!store.getters["authentication/isAuthenticated"]) {
    return redirect('/signin')
  }
}
