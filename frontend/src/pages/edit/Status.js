const BOTH_LABEL = 'both'
const EDIT_LABEL = 'edit'
const VIEW_LABEL = 'view'
const DEFAULT_STATUS = BOTH_LABEL

/**
 * @typedef {'both'|'edit'|'view'} Status
 */

/**
 * Statusの状態を確認する関数
 *
 * @param {?Status} status 現在のstauts
 * @param {Status} label 確認するラベル名
 * @param {String} defaultStatus デフォルトのstatus
 */
const checkViewStatus = (status, label, defaultStatus = DEFAULT_STATUS) => status ? status === label : defaultStatus === label

/**
 * Both状態であるか
 *
 * @param {?Status} status
 * @param {Status} defaultStatus
 */
const isBothStatus = (status, defaultStatus = DEFAULT_STATUS) => checkViewStatus(status, BOTH_LABEL, defaultStatus)

/**
 * Edit状態であるか
 *
 * @param {?Status} status
 * @param {Status} defaultStatus
 */
const isEditStatus = (status, defaultStatus = DEFAULT_STATUS) => checkViewStatus(status, EDIT_LABEL, defaultStatus)

/**
 * View状態であるか
 *
 * @param {?Status} status
 * @param {Status} defaultStatus デフォルト値
 */
const isViewStatus = (status, defaultStatus = DEFAULT_STATUS) => checkViewStatus(status, VIEW_LABEL, defaultStatus)

export {
  BOTH_LABEL,
  EDIT_LABEL,
  VIEW_LABEL,
  isBothStatus,
  isEditStatus,
  isViewStatus
}
