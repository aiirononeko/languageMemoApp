import * as stringFunc from '~/utils/string'

describe('utils/string', () => {

  describe("キャメルケース", () => {
    it("キャメルケースになるか", () => {
      expect(stringFunc.camelCase("sample string")).toBe("sampleString")
      expect(stringFunc.camelCase("sample_string")).toBe("sampleString")
      expect(stringFunc.camelCase("sample-string")).toBe("sampleString")
      expect(stringFunc.camelCase("sampleString")).toBe("sampleString")
      expect(stringFunc.camelCase("SampleString")).toBe("sampleString")
    })
  })

  describe("pascalCase", () => {
    it("パスカルケースになるか", () => {
      expect(stringFunc.pascalCase("sample string")).toBe("SampleString")
      expect(stringFunc.pascalCase("sample_string")).toBe("SampleString")
      expect(stringFunc.pascalCase("sample-string")).toBe("SampleString")
      expect(stringFunc.pascalCase("sampleString")).toBe("SampleString")
      expect(stringFunc.pascalCase("SampleString")).toBe("SampleString")
    })
  })

  describe("snakeCase", () => {
    it("スネークケースになるか", () => {
      expect(stringFunc.snakeCase("sample string")).toBe("sample_string")
      expect(stringFunc.snakeCase("sample_string")).toBe("sample_string")
      expect(stringFunc.snakeCase("sample-string")).toBe("sample_string")
      expect(stringFunc.snakeCase("sampleString")).toBe("sample_string")
      expect(stringFunc.snakeCase("SampleString")).toBe("sample_string")
    })
  })

  describe("isAlphaNumUnderScore", () => {
    const testCases = [
      { message: 'アルファベットと数字混じりのとき、trueである', arg: 'abcABC123', bool: true },
      { message: 'アルファベットと数字、アンダースコアのとき、trueである', arg: 'abc_ABC_123', bool: true },
      { message: 'アルファベット小文字のみ、trueである', arg: 'abc', bool: true },
      { message: 'アルファベット大文字のみ、trueである', arg: 'ABC', bool: true },
      { message: '数字のみ、trueである', arg: '123', bool: true },
    ]

    for (const testCase of testCases) {
      it(testCase.message, () => {
        expect(stringFunc.isAlphaNumUnderScore(testCase.arg)).toBe(testCase.bool)
      })
    }
  })

  describe("isString", () => {
    const testCases = [
      { message: '文字列のとき、trueか', arg: 'aaa', bool: true },
      { message: '文字列のとき、trueか', arg: '123', bool: true },
      { message: '空の文字列のとき、trueか', arg: '', bool: true },
      { message: '数字のとき、falseか', arg: 123, bool: false },
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
        expect(stringFunc.isString(testCase.arg)).toBe(testCase.bool)
      })
    }
  })

  describe("isUuid", () => {
    const testCases = [
      { message: '32文字のuuid (ハイフン無し)、trueである', arg: '51daf51cce174884a703cb8e9b37f1f2', bool: true },
      { message: '36文字のuuid (ハイフンあり)である', arg: '51daf51c-ce17-4884-a703-cb8e9b37f1f2', bool: false },
      { message: '33文字の文字列のとき、falseである', arg: 'abcdefghijklmnopqrstuvwxyz0123456', bool: false },
      { message: '31文字の文字列のとき、falseである', arg: 'abcdefghijklmnopqrstuvwxyz01234', bool: false },
      { message: '数字のとき、falseである', arg: "1", bool: false },
      { message: '数字のとき、falseである', arg: 1, bool: false },
    ]

    for (const testCase of testCases) {
      it(testCase.message, () => {
        expect(stringFunc.isUuid(testCase.arg)).toBe(testCase.bool)
      })
    }
  })
})
