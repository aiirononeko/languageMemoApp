export default ({ store: { getters }, redirect }) => {
    // ユーザーが認証されていないとき
  if (!getters["authentication/isAuthenticated"]) {
    return redirect('/signin')
  }
}
