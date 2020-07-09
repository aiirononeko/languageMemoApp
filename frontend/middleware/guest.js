export default ({ store: { getters }, redirect }) => {
  // ユーザーが認証されているとき
  if (getters["authentication/isAuthenticated"]) {
    return redirect('/settings/profile')
  }
}
