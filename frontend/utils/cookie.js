/**
 * 指定した名前のCookieにundefinedがないかを確認する
 *
 * @param {import('universal-cookie')} cookies
 * @param {Array<String>} names
 * @return Boolean
 */
export const isCookieUndefined = (cookies, names) => {
  for (const name of names) {
    if (cookies.get(name) === 'undefined') {
      return true
    }
  }
  return false
}

/**
 * 指定した名前のCookieをすべて削除する
 *
 * @param {import('universal-cookie')} cookies
 * @param {Array<String>} names
 * @return void
 */
export const cookieRemoveAll = (cookies, names) =>
  names.forEach((name) => cookies.remove(name, { path: '/' }))

