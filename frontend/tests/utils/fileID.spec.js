import { isValidFileID } from "~/utils/fileID"

describe('utils/fileID', () => {
  /**
   * @typedef FileIDTest
   * @property { String } expect テストの内容
   * @property { any } arg テスト関数の引数
   * @property { Boolean } bool 期待される結果
   */

  /**
   * @type { FileIDTest[] }
   */
  const FileIDTests = [
    { expect: '自然数のとき、正しいファイルIDか(引数: Number Integer)', arg: 10, bool: true },
    { expect: '自然数のとき、正しいファイルIDか(引数: String Integer)', arg: "10", bool: true },
    { expect: '自然数のとき、正しいファイルIDか(引数: Number Float)', arg: 10.0, bool: true },
    { expect: '自然数のとき、正しいファイルIDか(引数: String Float)', arg: "10.0", bool: true },
    { expect: '0のとき、正しくないファイルIDか(引数: Number)', arg: 0, bool: false },
    { expect: '0のとき、正しくないファイルIDか(引数: String)', arg: "0", bool: false },
    { expect: '負の値のとき、正しくないファイルIDか(引数: Number)', arg: -1, bool: false },
    { expect: '負の値のとき、正しくないファイルIDか(引数: String)', arg: "-1", bool: false },
    { expect: '小数のとき、正しくないファイルIDか(引数: Number)', arg: 10.5, bool: false },
    { expect: '小数のとき、正しくないファイルIDか(引数: String)', arg: "10.5", bool: false },
    { expect: '小数のとき、正しくないファイルIDか(引数: Number)', arg: -1.0, bool: false },
    { expect: '小数のとき、正しくないファイルIDか(引数: String)', arg: "-1.5", bool: false },
    { expect: '関係ない文字列のとき、正しないファイルIDか', arg: "hoge", bool: false },
    { expect: 'undefinedのとき、正しないファイルIDか', arg: undefined, bool: false },
    { expect: 'nullのとき、正しないファイルIDか', arg: null, bool: false },
  ]

  for (const test of FileIDTests) {
    it(`test.expect arg: ${test.arg}`, () => {
      expect(isValidFileID(test.arg)).toBe(test.bool)
    })
  }
})
