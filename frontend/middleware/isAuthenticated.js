export default function ({ store, redirect }) {
    // ユーザーが認証されていないとき
      if(!store.state.isAuthenticated) {
          console.log("aa")
          redirect('/user/login');
      }
  }