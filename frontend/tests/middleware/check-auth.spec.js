import middleware from '@/middleware/check-auth'

describe('check-auth', () => {
  describe('ユーザー情報を取得できるとき', () => {
    it('ユーザー情報の取得をする', async () => {
      // dispatch のモック
      const dispatch = jest.fn().mockImplementation((arg) => Promise.resolve(arg))
      const context = {
        store: {
          dispatch,
          getters: {
            "authentication/canFetchUser": true
          }
        }
      }

      await middleware(context)

      expect(dispatch.mock.calls).toHaveLength(1)
    })
  })

  describe('ユーザー情報を取得できないとき', () => {
    it('ユーザー情報の取得をしない', async () => {
      // dispatch のモック
      const dispatch = jest.fn().mockImplementation((arg) => Promise.resolve(arg))

      const context = {
        store: {
          dispatch,
          getters: {
            "authentication/canFetchUser": false
          }
        }
      }

      await middleware(context)

      expect(dispatch.mock.calls).toHaveLength(0)
    })
  })
})
