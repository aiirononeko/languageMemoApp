import Folder from "./Folder"
import { isUnsignedInteger, strOrNumToNumber } from "@/utils/number"
import { isUuid } from "@/utils/string"

/**
 * @typedef PostAttributes
 * @property {Array<Object>} ancestor-folders
 * @property {String} created-at
 * @property {String} content
 * @property {String} name
 * @property {String} public
 * @property {String} uid
 * @property {Number} user-id
 * @property {String} updated-at
 */

/**
 * @typedef PostNormal
 * @property {Array<Object>} ancestor_folders
 * @property {String} created_at
 * @property {String} content
 * @property {Number} id
 * @property {String} name
 * @property {String} parent_id
 * @property {String} public
 * @property {String} uid
 * @property {String} user_id
 * @property {String} updated_at
 */

/**
 * @class Post
 */
class Post {
  constructor(post) {
    /** @type Array<Folder> */
    this.ancestorFolders = []

    if (post.attributes) {
      this.withAttributesToPost(post)
    }
    else {
      this.toPost(post)
    }
  }

  /**
   *
   * @param {{ id: Number, type: String, attributes: PostAttributes }} param0
   */
  withAttributesToPost ({ id, type, attributes }) {
    this.id = strOrNumToNumber(id)
    this.type = type
    this.name = attributes.name
    this.public = attributes.public
    this.content = attributes.content
    this.uid = attributes.uid
    this.userID = strOrNumToNumber(attributes["user-id"])
    this.createdAt = new Date(attributes['created-at'])
    this.updatedAt = new Date(attributes['updated-at'])

    if (attributes["ancestor-folders"] && attributes["ancestor-folders"].length > 0) {
      this.parentID = attributes["ancestor-folders"][0].id
      this.ancestorFolders = attributes["ancestor-folders"].map((folder) => new Folder(folder))
    }
  }

  /**
   * @param {PostNormal} post
   */
  toPost (post) {
    this.id = strOrNumToNumber(post.id)
    this.type = "posts"
    this.name = post.name
    this.public = post.public
    this.content = post.content
    this.userID = strOrNumToNumber(post.user_id)
    this.uid = post.uid
    this.parentID = post.parent_id
    this.createdAt = new Date(post.created_at)
    this.updatedAt = new Date(post.updated_at)

    if (post.ancestor_folders && post.ancestor_folders.length > 0) {
      this.ancestorFolders = post.ancestor_folders.map((folder) => new Folder(folder))
    }
  }

  static isPost = (v) => v instanceof Post

  /**
   * 正しいpost IDか
   *
   * ここでは、引数が正の数か確認している。
   *
   * @param {String|Number} id
   */
  static isValidPostID = (id) => isUnsignedInteger(id)

  /**
   * 正しいpost uidか
   *
   * @param {String} uid
   */
  static isValidPostUID = (uid) => isUuid(uid)

  /**
   * MyPageへのリンクを生成する
   *
   * @param {Post} post
   * @param {String} username
   */
  static generateViewLink = (post, username) => {
    if (post.ancestorFolders.length === 0) {
      return `/${username}/${post.uid}`
    }

    // 先祖フォルダのデータを使い、階層構造を再現する
    const link = post.ancestorFolders.reduce((str, folder) => {
      str += `/${folder.id}`
      return str
    }, `/${username}`)

    return `${link}/${post.uid}`
  }
}

export default Post
