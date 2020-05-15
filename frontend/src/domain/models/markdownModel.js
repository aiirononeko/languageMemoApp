export default class markdownModel {
  constructor({ name, insert, line = null  }) {
    this.name = name
    this.insert = insert
    this.line = line
  }

  getLineNum () {
    if (typeof this.line === 'number') {
      return this.line
    }

    return this.line ? 1 : 0
  }
}
