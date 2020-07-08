import lodashCloneDeep from 'lodash.clonedeep'

/**
 * ディープコピー
 *
 * @template T
 * @param {T} v The value to recursively clone.
 * @return Returns the deep cloned value.
 */
export const cloneDeep = (v) => lodashCloneDeep(v)
