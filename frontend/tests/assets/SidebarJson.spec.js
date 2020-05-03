import SidebarJson from '~/assets/json/Sidebar.json'

describe('assets/json/Sidebar.json', () => {
  it('data内のkey名が全て、items内にあるか(また、その逆)', () => {
    const data = SidebarJson.data
    const items = SidebarJson.items

    // dataから一次元の配列を作成
    const _dataArr = Object.keys(data).reduce((acc, v) => {
      return acc.concat(data[v])
    }, [])
    // dataから重複をなくす
    const uniqDataArr = [...new Set(_dataArr)]
    // keys名から1次元の配列を作成
    const itemKeys = Object.keys(items)
    // 重複ありの配列を結合
    const arr = itemKeys.concat(uniqDataArr)
    // 重複していないものをリストアップ
    const expected = noUniqListUp(arr)

    // エラーメッセージの作成
    if (itemKeys.length !== uniqDataArr.length) {
      // エラーメッセージ用の文字列を作成
      const split = expected.reduce((acc, v) => {
        return acc += String(v) + ","
      }, "")
      if (itemKeys.length < uniqDataArr.length) {
        console.log(`itemsに${split}がありません。`)
      } else {
        console.log(`dataで${split}が使われていません`)
      }
    }
    expect(itemKeys.length === uniqDataArr.length).toBeTruthy() // jestでfailedとなるようにする
  })
})

/**
 * 重複していないものをリストアップ
 *
 * @param {String[]} arr
 * @returns {String[]}
 */
const noUniqListUp = (arr) => {
  return arr.filter((x, i, self) => {
    return self.indexOf(x) === i && i === self.lastIndexOf(x)
  })
}
