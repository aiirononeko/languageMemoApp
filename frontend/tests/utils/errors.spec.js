import { defaultErrorMessages, getErrorMessage } from "@/utils/errors"

describe('utils/errors', () => {
  describe('getErrorMessage',() => {

  /**
   * @typedef GetErrorMessageTest
   * @property { String } expect テストの内容
   * @property { any } arg テスト関数の引数
   * @property { String } key defaultErrorMessagesのkey名
   */

  /**
   * @type {GetErrorMessageTest[]}
   */
  const tests = [
      { expect: '401の内容を取得できる(引数: Number)', arg: 401, key: "401" },
      { expect: '401の内容を取得できる(引数: String)', arg: "401", key: "401" },
      { expect: '403の内容を取得できる(引数: Number)', arg: 403, key: "403" },
      { expect: '403の内容を取得できる(引数: String)', arg: "403", key: "403" },
      { expect: '404の内容を取得できる(引数: Number)', arg: 404, key: "404" },
      { expect: '404の内容を取得できる(引数: String)', arg: "404", key: "404" },
      { expect: '500の内容を取得できる(引数: Number)', arg: 500, key: "500" },
      { expect: '500の内容を取得できる(引数: String)', arg: "500", key: "500" },
      { expect: '500の内容を取得できる(引数: null)', arg: null, key: "500" },
      { expect: '500の内容を取得できる(引数: undefined)', arg: undefined, key: "500" },
      { expect: '存在しないkeyのとき、500の内容を取得できる(引数: Number)', arg: 402, key: "500" },
      { expect: '存在しないkeyのとき、500の内容を取得できる(引数: String)', arg: "402", key: "500" },
    ]

    for (const test of tests) {
      it(test.expect, () => {
        expect(getErrorMessage(test.arg)).toEqual(defaultErrorMessages[test.key])
      })
    }
  })
})
