import SidebarJson from '~/assets/json/Sidebar.json'

/**
 * 必要なデータを作る
 *
 * @param { String } name
 * @returns { Object[] }
 */
export const getDatas = (name) =>
  SidebarJson.data[name].map((key) => SidebarJson.items[key])

/**
 * 一意なコンポーネントの名前の配列を作る
 *
 * @param { Object[] } datas
 * @returns { String[] }
 */
const uniqComponentNames = (datas) => [...new Set(datas.map((key) => getComponentName(key)))]

/**
 * Componentの名前を取得する
 *
 * @param { Object } data
 * @returns { String }
 */
export const getComponentName = (data) =>
  data.event
    ? data.event.charAt(0).toUpperCase() + data.event.slice(1).toLowerCase() + "SidebarListItem"
    : "BaseSidebarListItem"

/**
 * Componentをimportする
 *
 * @param { String } name
 * @returns { Object }
 */
export const importComponents = (name) => {
  const d = getDatas(name)
  return uniqComponentNames(d).reduce((obj, component) => ({
  ...obj, [component]: () => import(`~/components/organisms/list/${component}`)
  }), {})
}
