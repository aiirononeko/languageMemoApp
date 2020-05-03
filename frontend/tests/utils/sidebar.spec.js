import * as sidebarservice from '~/utils/services/sidebarService'
import * as sidebar from '~/assets/json/sidebar'
import * as sidebarModel from '~/utils/models/sidebarModel'

describe('utils/sidebar', () => {

  describe('getDatas', () => {
    it('jsonからデータを取得できる(guest)', () => {
      expect(sidebarservice.getDatas("guest")).toBeDefined()
      expect(sidebarservice.getDatas("guest")).toHaveLength(sidebar.data.guest.length)
    })

    it("jsonからデータを取得できる(login)", () => {
      expect(sidebarservice.getDatas("login")).toBeDefined()
      expect(sidebarservice.getDatas("login")).toHaveLength(
        sidebar.data.login.length
      )
    })
  })

  describe('importComponent', () => {
    jest.mock('~/utils/models/sidebarModel')

    it('正しいObjectを取得できるか1', () => {
      jest.spyOn(sidebarModel, 'getSidebarJson').mockImplementation(() => {
        return {
          data: {
            guest: ["home", "login"]
          },
          items: {
            home: { name: "Home", to: "/", icon: "mdi-home" },
            login: {
              name: "ログイン",
              to: "/user/login",
              icon: "mdi-account-arrow-right",
              btn: true
            }
          }
        }
      })

      const received = sidebarservice.importComponents('guest')
      expect(received).toBeDefined()
      expect(received).toBeInstanceOf(Object)
      expect(received).toHaveProperty('BaseSidebarListItem')
      expect(received.BaseSidebarListItem).toBeInstanceOf(Function)
    })

    it('正しいObjectを取得できるか2', () => {
      jest.spyOn(sidebarModel, 'getSidebarJson').mockImplementation(() => {
        return {
          data: {
            guest: ["home", "logout"]
          },
          items: {
            home: { name: "Home", to: "/", icon: "mdi-home" },
            logout: {
              name: "ログイン",
              icon: "mdi-account-arrow-right",
              btn: true,
              event: 'logout'
            }
          }
        }
      })

      const received = sidebarservice.importComponents('guest')
      expect(received).toBeDefined()
      expect(received).toBeInstanceOf(Object)
      expect(received).toHaveProperty('BaseSidebarListItem')
      expect(received).toHaveProperty('LogoutSidebarListItem')
      expect(received.BaseSidebarListItem).toBeInstanceOf(Function)
      expect(received.LogoutSidebarListItem).toBeInstanceOf(Function)
    })
  })
})
