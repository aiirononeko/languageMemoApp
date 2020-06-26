import { isUnsignedInteger } from "@/utils/number"

describe('isUnsignedInteger', () => {
  const testCases = [
    { expect: '自然数のとき、正しい(引数: Number Integer)', arg: 10, bool: true },
    { expect: '自然数のとき、正しい(引数: String Integer)', arg: "10", bool: true },
    { expect: '自然数のとき、正しい(引数: Number Float)', arg: 10.0, bool: true },
    { expect: '自然数のとき、正しい(引数: String Float)', arg: "10.0", bool: true },
    { expect: '0のとき、正しくない(引数: Number)', arg: 0, bool: false },
    { expect: '0のとき、正しくない(引数: String)', arg: "0", bool: false },
    { expect: '負の値のとき、正しくない(引数: Number)', arg: -1, bool: false },
    { expect: '負の値のとき、正しくない(引数: String)', arg: "-1", bool: false },
    { expect: '小数のとき、正しくない(引数: Number)', arg: 10.5, bool: false },
    { expect: '小数のとき、正しくない(引数: String)', arg: "10.5", bool: false },
    { expect: '小数のとき、正しくない(引数: Number)', arg: -1.0, bool: false },
    { expect: '小数のとき、正しくない(引数: String)', arg: "-1.5", bool: false },
    { expect: '関係ない文字列のとき、正しくない', arg: "hoge", bool: false },
    { expect: 'undefinedのとき、正しくない', arg: undefined, bool: false },
    { expect: 'nullのとき、正しくない', arg: null, bool: false },
  ]

  for (const test of testCases) {
    it(`${test.expect} arg: ${test.arg}`, () => {
      expect(isUnsignedInteger(test.arg)).toBe(test.bool)
    })
  }
})
