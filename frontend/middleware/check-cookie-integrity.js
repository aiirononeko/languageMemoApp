import Cookies from '@/utils/Cookies'

/**
 * Cookieの整合性を確認する
 *
 * プログラムの事故で undefined が入っていないかを確認する
 */
export default () => {
  if (process.client) {
    const cookies = new Cookies()
    const checkCookieName = ['access-token', 'client', 'uid', 'id', 'username']

    // Cookieにundefinedがないか確認する
    if (!cookies.isCookiesDefined(checkCookieName)) {
      // 指定した名前のすべてのCookieを削除する
      cookies.removeAll(checkCookieName)
    }
  }
}

