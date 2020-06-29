import axios from 'axios'
require("dotenv").config();

const routes = ["/about", "/signin", "/signup", "/mimitaru"]
const onlyAuthRoutes = [
  "/settings",
  "/settings/profile",
];

const errors = [400, 401, 402, 403, 404, 422, 500, 501, 502, 503]
const FRONT_TEST_URL = 'http://localhost:3030'

describe('指定されたページでエラーが起きない', () => {
  let page

  beforeAll(async () => {
    jest.setTimeout(50000)
    page = await browser.newPage()
  })

  afterAll(async () => {
    await page.close()
  })

  describe("未認証のページ", () => {
    for (const route of routes) {
      it(`エラーが表示されない(${route})`, async () => {
        const response = await page.goto(`${FRONT_TEST_URL}${route}`)

        const summary = await page.$eval("h1#p-1", (selector) => {
          return selector.textContent
        })

        expect(response.request().redirectChain()).toHaveLength(0) // リダイレクト回数
        expect(summary).toBeDefined()
        expect(errors.includes(summary)).toBeFalsy()
      })
    }
  })

  describe("未認証時に画面が表示されない", () => {
    for (const route of onlyAuthRoutes) {
      it(`エラーが表示されない(${route})`, async () => {
        const response = await page.goto(`${FRONT_TEST_URL}${route}`);

        const summary = await page.$eval("h1#p-1", (selector) => {
          return selector.textContent;
        });

        expect(response.request().redirectChain()).toHaveLength(1); // リダイレクト回数
        expect(summary).toBeDefined();
        expect(errors.includes(summary)).toBeFalsy();
      });
    }
  });
})
