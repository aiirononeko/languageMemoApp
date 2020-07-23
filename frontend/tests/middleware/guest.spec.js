import middleware from '@/middleware/guest'

describe('guest', () => {
  describe('認証されているとき', () => {
    it('リダイレクトされる', () => {
      const redirectMock = jest.fn()
      const context = {
        store: {
          getters: {
            "authentication/isAuthenticated": true
          }
        },
        redirect: redirectMock
      }

      middleware(context)

      expect(redirectMock.mock.calls).toHaveLength(1) // 1回、リダイレクト関数が呼び出されるか
    })
  })

  describe('認証されていない時', () => {
    it('リダイレクトされない', () => {
      const redirectMock = jest.fn()
      const context = {
        store: {
          getters: {
            "authentication/isAuthenticated": false
          }
        },
        redirect: redirectMock
      }

      middleware(context)

      expect(redirectMock.mock.calls).toHaveLength(0) // 0回、リダイレクト関数が呼び出されるか
    })
  })
})
