import SidebarService from '~/src/domain/services/sidebarService'
import sidebar from '~/assets/json/Sidebar.json'
import * as sidebarModel from '~/src/infra/sidebarJsonInfra'

describe('utils/sidebar', () => {

  describe('getDatas', () => {
    it('jsonからデータを取得できる(guest)', () => {
      const sidebarService = new SidebarService("guest")
      expect(sidebarService.datas).toBeDefined()
      expect(sidebarService.datas).toHaveLength(sidebar.data.guest.length)
    })

    it("jsonからデータを取得できる(login)", () => {
      const sidebarService = new SidebarService("login")
      expect(sidebarService.datas).toBeDefined()
      expect(sidebarService.datas).toHaveLength(
        sidebar.data.login.length
      )
    })
  })

  describe('importComponent', () => {
    jest.mock("~/src/infra/sidebarJsonInfra")

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

      const sidebarService = new SidebarService("guest")
      const received = sidebarService.importComponents
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

      const sidebarService = new SidebarService("guest")
      const received = sidebarService.importComponents
      expect(received).toBeDefined()
      expect(received).toBeInstanceOf(Object)
      expect(received).toHaveProperty('BaseSidebarListItem')
      expect(received).toHaveProperty('LogoutSidebarListItem')
      expect(received.BaseSidebarListItem).toBeInstanceOf(Function)
      expect(received.LogoutSidebarListItem).toBeInstanceOf(Function)
    })
  })
})
