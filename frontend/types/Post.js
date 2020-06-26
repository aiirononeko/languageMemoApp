import Folder from "./Folder"
import { isUnsignedInteger, StrOrNumToNumber } from "@/utils/number"

/**
 * @typedef PostAttributes
 * @property {Array<Object>} ancestor-folders
 * @property {String} created-at
 * @property {String} content
 * @property {String} name
 * @property {String} public
 * @property {Number} user-id
 * @property {String} updated-at
 */

/**
 * @typedef PostNormal
 * @property {String} created_at
 * @property {String} content
 * @property {Number} id
 * @property {String} name
 * @property {String} parent_id
 * @property {String} public
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
    this.id = StrOrNumToNumber(id)
    this.type = type
    this.name = attributes.name
    this.public = attributes.public
    this.content = attributes.content
    this.userID = StrOrNumToNumber(attributes["user-id"])
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
    this.id = StrOrNumToNumber(post.id)
    this.type = "posts"
    this.name = post.name
    this.public = post.public
    this.content = post.content
    this.userID = StrOrNumToNumber(post.user_id)
    this.parentID = post.parent_id
    this.createdAt = new Date(post.created_at)
    this.updatedAt = new Date(post.updated_at)
  }

  static isPost = (v) => v instanceof Post

  /**
 * 正しいフォルダーIDか
 *
 * ここでは、引数が正の数か確認している。
 *
 * @param {*} id
 */
  static isValidPostID = (id) => isUnsignedInteger(id)
}

export default Post
