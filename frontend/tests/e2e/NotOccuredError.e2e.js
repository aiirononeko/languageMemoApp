// import axios from 'axios'
require("dotenv").config()

const guestRoutes = ["/about", "/signin", "/signup", "/mimitaru"]
const onlyAuthRoutes = [
  "/settings",
  "/settings/profile",
];
// const authRoutes = ["/about", "/settings", "/settings/profile", "/mimitaru"];
// const onlyGuestRoutes = ["/signin", "/signup", "/password/reset"]

const errors = [400, 401, 402, 403, 404, 422, 500, 501, 502, 503]
// const API_URL = process.env.BASE_URL || "http://localhost:3000";
const FRONT_TEST_URL = 'http://localhost:3030'

describe('認証後', () => {
  let page, data, headers

  beforeAll(async () => {
    jest.setTimeout(50000)
    page = await browser.newPage();
    // 認証情報の取得
    // const req = await axios.post(`${API_URL}/api/v1/auth/sign_in`, {
    //   email: 'mimi@example.com',
    //   password: 'password'
    // })
    // data = req.data
    // headers = req.headers
  })

  afterAll(async () => {
    await page.close()
  })

  describe("認証後の画面が正常に見える", () => {

    for (const route of guestRoutes) {
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

    // TODO ここで認証すれば、テスト通るはずなんだけど......

    // (async () => {
    //   page.setCookie([
    //       {
    //         name: "access-token",
    //         value: headers["access-token"],
    //         path: "/",
    //         url: FRONT_TEST_URL,
    //       },
    //       {
    //         name: "client",
    //         value: headers.client,
    //         path: "/",
    //         url: FRONT_TEST_URL,
    //       },
    //       {
    //         name: "uid",
    //         value: headers.uid,
    //         path: "/",
    //         url: FRONT_TEST_URL
    //       },
    //       {
    //         name: "id",
    //         value: data.data.id,
    //         path: "/",
    //         url: FRONT_TEST_URL
    //       },
    //       {
    //         name: "username",
    //         value: "mimitaru",
    //         path: "/",
    //         url: FRONT_TEST_URL
    //       },
    //     ]
    //   );
    // })

    // for (const route of authRoutes) {
    //   it(`エラーが表示されない(${route})`, async () => {
    //     const response = await page.goto(`${FRONT_TEST_URL}${route}`)

    //     const summary = await page.$eval("h1#p-1", (selector) => {
    //       return selector.textContent
    //     })

    //     expect(response.request().redirectChain()).toHaveLength(0) // リダイレクト回数
    //     expect(summary).toBeDefined()
    //     expect(errors.includes(summary)).toBeFalsy()
    //   })
    // }

    // for (const route of onlyGuestRoutes) {
    //   it(`エラーが表示されない(${route})`, async () => {
    //     const response = await page.goto(`${FRONT_TEST_URL}${route}`)

    //     const summary = await page.$eval("h1#p-1", (selector) => {
    //       return selector.textContent
    //     })

    //     expect(response.request().redirectChain()).toHaveLength(1) // リダイレクト回数
    //     expect(summary).toBeDefined()
    //     expect(errors.includes(summary)).toBeFalsy()
    //   })
    // }
  })
})
