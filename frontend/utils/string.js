/**
 * キャメルケースへ変換 sampleString
 * @param {String} str
 * @return String
 */
export const camelCase = (str) => {
  str = str.charAt(0).toLowerCase() + str.slice(1)
  return str.replace(/[-_ ](.)/g, (match, group) =>
    group.toUpperCase()
  )
}


/**
 * スネークケースへ変換 sample_string
 * @param {String} str
 * @return String
 */
export const snakeCase = (str) => {
  const camel = camelCase(str)
  return camel.replace(/[A-Z]/g, (s) =>
    "_" + s.charAt(0).toLowerCase()
  )
}


/**
 * パスカルケースへ変換 SampleString
 * @param {String} str
 * @return String
 */
export const pascalCase = (str) => {
  const camel = camelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

/**
 * アルファベット(大文字小文字)か数字か_(アンダースコア)かどうかを確認
 *
 * @param {String} v
 */
export const isAlphaNumUnderScore = (v) => isString(v) && /^[\w]+$/.test(v)

/**
 * 文字列型か
 *
 * @param {any} v
 * @return {boolean}
 */
export const isString = (v) => typeof v === 'string'

/**
 * 32文字のハイフン無しのuuidかどうかを確認
 *
 * @param {String} v
 */
export const isUuid = (v) => isString(v) && /^[0-9a-f]{32}$/.test(v)
