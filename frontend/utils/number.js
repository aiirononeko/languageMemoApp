/**
 * Number型かどうか
 *
 * @param {*} v
 */
export const isNumber = (v) => typeof v === 'number'

/**
 * 自然数かどうか
 *
 * @param {String|Number} v
 * @return {boolean}
 */
export const isUnsignedInteger = (v) => {
  const num = StrOrNumToNumber(v)
  return Number.isInteger(num) && num > 0
}

/**
 * String型とNumber型をNumber型に変換する
 *
 * @param {String|Number} v
 * @returns {Number}
 */
export const StrOrNumToNumber = (v) => {
  if (!v) {
    return undefined
  }

  return isNumber(v) ? v : Number(v)
}
