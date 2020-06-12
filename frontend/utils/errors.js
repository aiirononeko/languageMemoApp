import { isString } from "~/utils/string"

export const defaultErrorMessages = {
  401: {
    title: "Unauthorized",
    message: "認証ができていません"
  },

  403: {
    title: "Forbidden",
    message: "ページを見る権限がありません"
  },

  404: {
    title: "Page Not Found",
    message: "ページが存在しません"
  },

  500: {
    title: "Internal Server Error",
    message: "エラーが発生しました"
  },
}

/**
 * ErrorMessage の objectを取得する
 *
 * @param {String|Number|null} statusCode
 * @return {{title: string, message: string}}
 */
export const getErrorMessage = (statusCode = null) => {
  // 文字列以外のときに、文字列型にキャストする
  if (statusCode && !isString(statusCode)) {
    statusCode = String(statusCode)
  }
  // statusCodeがnullのとき、500にする。
  if (!statusCode) {
    statusCode = "500"
  }

  for (const key in defaultErrorMessages) {
    if (key === statusCode) {
      return defaultErrorMessages[key]
    }
  }

  return defaultErrorMessages["500"]
}
