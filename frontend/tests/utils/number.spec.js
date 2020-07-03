import { isUnsignedInteger, isNumber, StrOrNumToNumber } from "@/utils/number"

describe("is", () => {
  describe("isNumber", () => {
    const testCases = [
      { message: '数字のとき、trueか', arg: 123, bool: true },
      { message: '文字列のとき、falseか', arg: 'aaa', bool: false },
      { message: '文字列のとき、falseか', arg: '123', bool: false },
      { message: '空の文字列のとき、falseか', arg: '', bool: false },
      { message: 'Booleanのとき、falseか', arg: true, bool: false },
      { message: 'Objectのとき、falseか', arg: {}, bool: false },
      { message: 'Objectのとき、falseか', arg: { name: 'hoge' }, bool: false },
      { message: '配列のとき、falseか', arg: [], bool: false },
      { message: '配列のとき、falseか', arg: ['hoge'], bool: false },
      { message: 'nullのとき、falseか', arg: null, bool: false },
      { message: 'undefinedのとき、falseか', arg: undefined, bool: false },
    ]

    for (const testCase of testCases) {
      it(testCase.message, () => {
        expect(isNumber(testCase.arg)).toBe(testCase.bool)
      })
    }
  })

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

  describe("StrOrNumToNumber", () => {
    const testCases = [
      { expect: 'Number型のとき、Number型のままである', arg: 10, retVal: 10 },
      { expect: 'String型 (中身は数字) のとき、Number型になる', arg: "10", retVal: 10 },
      { expect: '関係ないString型のとき、undefined になる', arg: "aaa", retVal: undefined },
      { expect: 'Boolean型のとき、undefined になる', arg: "aaa", retVal: undefined },
      { expect: '配列型のとき、undefined になる', arg: ["aaa"], retVal: undefined },
      { expect: '配列型のとき、undefined になる', arg: [], retVal: undefined },
      { expect: 'Object型のとき、undefined になる', arg: { name: "aaa" }, retVal: undefined },
      { expect: 'Object型のとき、undefined になる', arg: {}, retVal: undefined },
      { expect: 'nullのとき、undefined になる', arg: null, retVal: undefined },
      { expect: 'undefinedのとき、undefined になる', arg: undefined, retVal: undefined },
    ]

    for (const test of testCases) {
      it(`${test.expect} arg: ${test.arg}`, () => {
        expect(StrOrNumToNumber(test.arg)).toBe(test.retVal)
      })
    }
  })
})