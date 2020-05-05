import { pascalCase } from '~/utils/string'
import { getSidebarJson } from '~/src/infra/sidebarJsonInfra'
import SidebarModel from "~/src/domain/models/sidebarModel"

/**
 * sibebar.jsonから必要なデータを取得する
 *
 * @param { String } name
 * @returns { Object[] }
 */
const getDatas = (name) => {
  const sidebarJson = getSidebarJson()
  const sidebar = new SidebarModel(sidebarJson.data[name], sidebarJson.items)
  return sidebar.concatData
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
const getComponentName = (data) =>
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
const importComponents = (datas) => {
  return uniqComponentNames(datas).reduce(
    (obj, component) => ({
      ...obj,
      [component]: () => import(`~/components/organisms/list/${component}`),
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

const SidebarService = class {
  constructor(name) {
    this.name = name
    this.datas = getDatas(name)
  }

  componentName (data) {
    return getComponentName(data)
  }

  get importComponents () {
    return importComponents(this.datas)
  }
}

export default SidebarService
