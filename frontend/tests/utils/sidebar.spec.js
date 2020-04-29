import * as sidebar from '~/utils/sidebar'
import SidebarJson from "~/assets/json/Sidebar.json"

describe('utils/sidebar', () => {

  describe('getDatas', () => {
    it('getDatas', () => {
      console.log(SidebarJson)
      console.log(SidebarJson.data['guest'])
      console.log(
        SidebarJson.data["guest"].map((key) => SidebarJson.items[key])
      )
      console.log(sidebar.getDatas("guest"))

      // expect(Array.isArray(sidebar.getDatas('guest'))).toBeTruthy()
    })

    it('importComponents', () => {
      console.log(sidebar.importComponents('guest'))
    })
  })
})
