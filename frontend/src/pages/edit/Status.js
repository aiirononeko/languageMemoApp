const BOTH_LABEL = 'both'
const EDIT_LABEL = 'edit'
const VIEW_LABEL = 'view'
const DEFAULT_STATUS = BOTH_LABEL

/**
 * Statusの状態を確認する関数
 *
 * @param {String} status 現在のstauts
 * @param {String} label 確認するラベル名
 * @param {String} defaultStatus デフォルトのstatus
 */
const checkViewStatus = (status, label, defaultStatus) => status ? status === label : defaultStatus === label

/**
 * Both状態であるか
 *
 * @param {'both'|'edit'|'view'} status
 */
export const isBothStatus = (status) => checkViewStatus(status, BOTH_LABEL, DEFAULT_STATUS)

/**
 * Edit状態であるか
 *
 * @param {'both'|'edit'|'view'} status
 */
export const isEditStatus = (status) => checkViewStatus(status, EDIT_LABEL, DEFAULT_STATUS)

/**
 * View状態であるか
 *
 * @param {'both'|'edit'|'view'} status
 */
export const isViewStatus = (status) => checkViewStatus(status, VIEW_LABEL, DEFAULT_STATUS)
