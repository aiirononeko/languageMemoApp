const routes = ["/about", "/signin", "/signup", "/mimitaru"];

const errors = [400, 401, 402, 403, 404, 422, 500, 501, 502, 503]

describe('指定されたページでエラーが起きない', () => {
  let page

  beforeAll(async () => {
    jest.setTimeout(50000)
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
  })

  for (const route of routes) {
    it(`エラーが表示されない(${route})`, async () => {
      await page.goto(`http://localhost:3030${route}`)

      const summary = await page.$eval("h1#p-1", (selector) => {
        return selector.textContent
      })

      expect(summary).toBeDefined()
      expect(errors.includes(summary)).toBeFalsy()
    })
  }
})
