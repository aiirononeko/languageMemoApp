import UniversalCookies from 'universal-cookie'

class Cookies extends UniversalCookies {
  /**
   * 指定した名前のCookieをすべて取得する
   *
   * @param { Array<String> } names
   * @param { import('universal-cookie').CookieOpts|null } options
   * @return { Array<String> }
   */
  getMultiple = (names, options = {}) => names.map(name => this.get(name, options))

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
    const valArr = this.getMultiple(names)
    return valArr.every(v => v !== 'undefined')
  }
}

export default Cookies
