import { shallowMount  } from '@vue/test-utils'
import Notification from '~/components/material/notification'

describe('material/notification', () => {
  it('v-alertが表示される', () => {
    const value = true
    const elevation = 6
    const wrapper = shallowMount(Notification, {
      propsData: { elevation, value },
      slots: {
        default: '<p id="test_vAlert"></p>'
      }
    })
    expect(wrapper.contains('#test_vAlert')).toBe(true)
  })
})
