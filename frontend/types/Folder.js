import Post from "./Post"
import { isUnsignedInteger, StrOrNumToNumber } from "@/utils/number"

/**
 * @typedef FolderAttributes
 * @property {Array<Object>} ancestor-folders
 * @property {String} created-at
 * @property {Array<Object>} child-folders
 * @property {String} name
 * @property {Array<Object>} posts
 * @property {String} public
 * @property {String|Number} user-id
 * @property {String} updated-at
 */

/**
 * @typedef FolderNormal
 * @property {String} created_at
 * @property {String|Number} id
 * @property {String} name
 * @property {String|Number} parent_id
 * @property {String} public
 * @property {String|Number} user_id
 * @property {String} updated_at
 */

/**
 * @class Folder
 */
class Folder {
  constructor(folder) {
    /** @type Array<Post> */
    this.posts = []
    /** @type Array<Folder> */
    this.childFolders = []
    /** @type Array<Folder> */
    this.ancestorFolders = []

    if (folder.attributes) {
      this.withAttributesToFolder(folder)
    }
    else {
      this.toFolder(folder)
    }
  }

  /**
   *
   * @param {{ id: String, type: String, attributes: FolderAttributes }} param0
   */
  withAttributesToFolder ({ id, type, attributes }) {
    this.id = StrOrNumToNumber(id)
    this.type = type
    this.name = attributes.name
    this.public = attributes.public
    this.userID = StrOrNumToNumber(attributes["user-id"])
    this.createdAt = new Date(attributes['created-at'])
    this.updatedAt = new Date(attributes['updated-at'])

    if (attributes["ancestor-folders"] && attributes["ancestor-folders"].length > 0) {
      /** @type String */
      this.parentID = StrOrNumToNumber(attributes["ancestor-folders"][0].id)
      this.ancestorFolders = attributes["ancestor-folders"].map((folder) => new Folder(folder))
    }

    if (attributes["child-folders"] && attributes["child-folders"].length > 0) {
      this.childFolders = attributes["child-folders"].map((folder) => new Folder(folder))
    }

    if (attributes.posts) {
      this.posts = attributes.posts.map((post) => new Post(post))
    }
  }

  /**
   *
   * @param {FolderNormal} folder
   */
  toFolder (folder) {
    this.id = StrOrNumToNumber(folder.id)
    this.type = "folders"
    this.name = folder.name
    this.userID = StrOrNumToNumber(folder.user_id)
    this.public = folder.public
    this.createdAt = new Date(folder.created_at)
    this.updatedAt = new Date(folder.updated_at)
    this.parentID = folder.parent_id
  }

  /**
   *
   * @param {Folder} folder
   * @param {String|Number} id
   */
  static deletePost (folder, id) {
    const num = StrOrNumToNumber(id)
    folder.posts = folder.posts.filter((post) => post.id !== num)
    return folder
  }

  /**
   *
   * @param {Folder} folders
   * @param {Number|String} id
   */
  static deleteChildFolder (folders, id) {
    const num = StrOrNumToNumber(id)
    folders.childFolders = folders.childFolders.filter((folder) => folder.id !== num)
    return folders
  }

  /**
   * フォルダーIDとidが等しいかどうか
   *
   * @param {Folder} folders
   * @param {Number|String} id
   */
  static isEqualFolderID = (folders, id) => folders.id === StrOrNumToNumber(id)

  /**
   * @param {*} v
   */
  static isFolder = (v) => v instanceof Folder

  /**
   * 正しいフォルダーIDか
   *
   * ここでは、引数が整数値か確認している。
   *
   * @param {*} id
   */
  static isValidFolderID = (id) => isUnsignedInteger(id)

  /**
   *
   * @param {Folder} folder
   * @param {Post} post
   */
  static pushPost (folder, post) {
    const newFolder = Object.assign({}, folder)

    if (Post.isPost(post)) {
      newFolder.posts.push(post)
      return newFolder
    }

    newFolder.posts.push(new Post(post))
    return newFolder
  }

  /**
   *
   * @param {Folder} folder
   * @param {Folder} newChildFolder
   */
  static pushChildFolder (folder, newChildFolder) {
    const newFolder = Object.assign({}, folder)

    if (Folder.isFolder(newChildFolder)) {
      newFolder.childFolders.push(newChildFolder)
      return newFolder
    }

    newFolder.childFolders.push(new Folder(newChildFolder))
    return newFolder
  }

  /**
   *
   * @param {Folder} folder
   * @param {Number} id
   * @param {Post} post
   */
  static updatePost (folder, id, post) {
    const newFolder = Object.assign({}, folder)
    const num = StrOrNumToNumber(id)
    const idx = newFolder.posts.findIndex((posts) => posts.id === num)

    if (idx === -1) {
      return newFolder
    }

    newFolder.posts[idx] = Post.isPost(post)
      ? post
      : new Folder(post)

    return newFolder
  }

  /**
   *
   * @param {Folder} folder
   * @param {Number} id
   * @param {Folder} newChildFolder
   */
  static updateChildFolder (folder, id, newChildFolder) {
    const newFolder = Object.assign({}, folder)
    const num = StrOrNumToNumber(id)
    const idx = newFolder.childFolders.findIndex((folders) => folders.id === num)

    if (idx === -1) {
      return newFolder
    }

    newFolder.childFolders[idx] = Folder.isFolder(newChildFolder)
      ? newChildFolder
      : new Folder(newChildFolder)

    return newFolder
  }
}

export default Folder
