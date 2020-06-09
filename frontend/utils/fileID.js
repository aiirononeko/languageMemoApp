/**
 * 正しいファイルIDかを確認
 *
 * ここでは、引数が整数値か確認している。
 *
 * @param {String|Number} v
 * @return {boolean}
 */
export const isValidFileID = (v) => {
  v = typeof v === 'number' ? v : Number(v)
  return Number.isInteger(v)
}
