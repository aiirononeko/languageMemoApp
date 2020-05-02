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
})
