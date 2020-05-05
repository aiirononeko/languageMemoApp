const SidebarModel = class {
  constructor(data, items) {
    this.data = data ||  null
    this.items = items || null
  }

  get concatData () {
    return this.data.map((key) => this.items[key])
  }
}

export default SidebarModel
