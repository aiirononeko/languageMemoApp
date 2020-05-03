/**
 * キャメルケースへ変換 sampleString
 * @param string
 * @return string
 */
export const camelCase = (str) => {
  str = str.charAt(0).toLowerCase() + str.slice(1)
  return str.replace(/[-_ ](.)/g, (match, group) => {
    return group.toUpperCase()
  })
}


/**
 * スネークケースへ変換 sample_string
 * @param string
 * @return string
 */
export const snakeCase = (str) => {
  const camel = camelCase(str)
  return camel.replace(/[A-Z]/g, (s) => {
    return "_" + s.charAt(0).toLowerCase()
  })
}


/**
 * パスカルケースへ変換 SampleString
 * @param string
 * @return string
 */
export const pascalCase = (str) => {
  const camel = camelCase(str)
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}
