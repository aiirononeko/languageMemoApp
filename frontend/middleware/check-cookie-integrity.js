import Cookies from 'universal-cookie'
import { cookieRemoveAll, isCookieUndefined } from '~/utils/cookie'

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
    if (isCookieUndefined(cookies, checkCookieName)) {
      // 指定した名前のすべてのCookieを削除する
      cookieRemoveAll(cookies, checkCookieName)
    }
  }
}

