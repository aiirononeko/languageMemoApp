import { pascalCase } from '~/utils/string'
import { getSidebarJson } from '~/utils/models/sidebarModel'

const PATH_COMPONENT = "~/components/organisms/list/"

/**
 * sibebar.jsonから必要なデータを取得する
 *
 * @param { String } name
 * @returns { Object[] }
 */
export const getDatas = (name) => {
  const sidebarJson = getSidebarJson()
  return sidebarJson.data[name].map((key) => sidebarJson.items[key])
}

/**
 * Componentの名前を取得する
 *
 * event が logout の場合は LogoutSidebarListItem を返す
 *
 * evnet がない場合は BaseSidebarListItemを返す
 *
 * @param { Object } data
 * @returns { String }
 */
export const getComponentName = (data) =>
  data.event ? `${pascalCase(data.event)}SidebarListItem` : "BaseSidebarListItem"

/**
 * Componentをimportし、vue用のObjectを取得する
 *
 * @param { String } name
 * @returns { Object }
 * @example
 * {
 *    BaseSidebarListItem: () => import('~/components/organisms/list/BaseSidebarListItem')
 *    LogoutSidebarListItem: () => import('~/components/organisms/list/LogoutSidebarListItem')
 * }
 */
export const importComponents = (name) => {
  const d = getDatas(name)
  return uniqComponentNames(d).reduce(
    (obj, component) => ({
      ...obj,
      [component]: () => import(`${PATH_COMPONENT}${component}`),
    }), {}
  )
}

/**
 * 一意なコンポーネントの名前の配列を作る
 *
 * @param { Object[] } datas
 * @returns { String[] }
 */
const uniqComponentNames = (datas) => [...new Set(datas.map((key) => getComponentName(key)))]
