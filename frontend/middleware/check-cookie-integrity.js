import Cookies from '@/utils/Cookies'
import { AUTH_DATA } from '@/types/Cookie'

/**
 * Cookieの整合性を確認する
 *
 * プログラムの事故で undefined が入っていないかを確認する
 */
export default () => {
  if (process.client) {
    const cookies = new Cookies()
    const checkCookieName = AUTH_DATA

    // Cookieにundefinedがないか確認する
    if (!cookies.isCookiesDefined(checkCookieName)) {
      // 指定した名前のすべてのCookieを削除する
      cookies.removeAll(checkCookieName)
    }
  }
}

