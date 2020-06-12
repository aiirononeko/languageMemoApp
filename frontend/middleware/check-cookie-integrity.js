import Cookies from '~/utils/Cookie'

/**
 * Cookieの整合性を確認する
 *
 * プログラムの事故で undefined が入っていないかを確認する
 */
export default () => {
  if (process.browser) {
    const cookies = new Cookies()
    const checkCookieName = ['access-token', 'client', 'uid', 'id', 'username']

    // Cookieにundefinedがないか確認する
    if (!cookies.isCookiesDefined(checkCookieName)) {
      // 指定した名前のすべてのCookieを削除する
      cookies.removeAll(checkCookieName)
    }
  }
}

