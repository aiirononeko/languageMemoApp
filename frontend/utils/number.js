import { isString } from "./string"

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
  const num = strOrNumToNumber(v)
  return !!num && Number.isInteger(num) && num > 0
}

/**
 * ランダムな数 (整数) の取得
 * 0 <= rand <= max - 1
 *
 * @param {Number} max
 * @returns {Number}
 */
export const randNumber = (max) => Math.floor(Math.random() * max)

/**
 * String型とNumber型をNumber型に変換する
 *
 * それ以外の方は、undefinedにする
 *
 * @param {String|Number} v
 * @returns {Number}
 */
export const strOrNumToNumber = (v) => {
  if (isNumber(v)) {
    return v
  }

  if (isString(v)) {
    return /[\d]+/.test(v) ? Number(v) : undefined
  }

  return undefined
}
