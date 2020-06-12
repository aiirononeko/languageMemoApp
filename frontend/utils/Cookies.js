import UniversalCookies from 'universal-cookie'

class Cookies extends UniversalCookies {
  /**
   * 指定した名前のCookieをすべて取得する
   *
   * @param { Array<String> } names
   * @param { import('universal-cookie').CookieOpts|null } options
   * @returns {{ [x: string]: string }}
   */
  getMultiple = (names, options = {}) => names.reduce((obj, name) => {
    obj[name] = this.get(name, options)
    return obj
  }, {})

  /**
   * 指定した名前のCookieをすべて削除する
   *
   * @param { Array<String> } names
   * @param { import('universal-cookie').CookieOpts|null } options
   * @return { void }
   */
  removeAll = (names, options = {}) => names.forEach(name => this.remove(name, options))

  /**
   * 指定した名前のCookieがすべて、定義されているか確認
   *
   * すべてundefinedでないことを確認
   *
   * @param { Array<String> } names
   * @return { Boolean }
   */
  isCookiesDefined = (names) => {
    const cookiesData = this.getMultiple(names)
    return Object.keys(cookiesData).every(key => cookiesData[key] !== 'undefined')
  }
}

export default Cookies
