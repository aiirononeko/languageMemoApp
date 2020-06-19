export const state = () => ({
  drawer: false
})

export const getters = {
  drawer: (state) => state.drawer
}

export const mutations = {
  onDrawer (state, bool = undefined) {
    state.drawer = bool ? bool : !state.drawer
  }
}
