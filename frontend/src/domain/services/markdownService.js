import markdownModel from "@/src/domain/models/markdownModel"

export default class markdownService {
  getMarkdownModel (name) {
    return new markdownModel(this.getMarkdownObj(name))
  }

  getMarkdownObj (name) {
    const mdStyle = mdStyleObj[name]
    if (typeof mdStyle === 'string' || typeof mdStyle === 'number') {
      return { name, insert: mdStyle }
    }

    return mdStyle
  }
}

const mdStyleObj = {
  'h1': '# ',
  'h2': '## ',
  'h3': '### ',
  'h4': '#### ',
  'h5': '##### ',
  'h6': '###### ',
  'bold': '** **',
  'italic': '* *',
  'undeline': '__ __',
  'strike': '~~ ~~',
  'link': '[text](https://)',
  'code': '` `',
  'quotes': '> ',
  'list': {
    'insert': '- ',
    'line': 1
  },
  'order-list': {
    'insert': '1. ',
    'line': 1
  }
}
