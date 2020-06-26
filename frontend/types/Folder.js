import Post from "./Post"
import { isNumber } from "@/utils/number"

/**
 * @typedef FolderAttributes
 * @property {Array<Object>} ancestor-folders
 * @property {String} created-at
 * @property {Array<Object>} child-folders
 * @property {String} name
 * @property {Array<Object>} posts
 * @property {String} public
 * @property {Number} user-id
 * @property {String} updated-at
 */

/**
 * @typedef FolderNormal
 * @property {String} created_at
 * @property {String} id
 * @property {String} name
 * @property {String} parent_id
 * @property {String} public
 * @property {Number} user_id
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
    /** @type Number */
    this.id = isNumber(id) ? id : Number(id)
    this.type = type
    this.name = attributes.name
    this.public = attributes.public
    this.userID = attributes["user-id"]
    this.createdAt = new Date(attributes['created-at'])
    this.updatedAt = new Date(attributes['updated-at'])

    if (attributes["ancestor-folders"] && attributes["ancestor-folders"].length > 0) {
      /** @type String */
      this.parentID = attributes["ancestor-folders"][0].id
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
    /** @type Number */
    this.id = isNumber(folder.id) ? folder.id : Number(folder.id)
    this.type = "folders"
    this.name = folder.name
    this.userID = folder.user_id
    this.public = folder.public
    this.createdAt = new Date(folder.created_at)
    this.updatedAt = new Date(folder.updated_at)
    this.parentID = folder.parent_id
  }

  /**
   *
   * @param {Folder} folder
   * @param {String} id
   */
  static deletePost (folder, id) {
    folder.posts = folder.posts.filter((post) => post.id !== id)
    return folder
  }

  /**
   *
   * @param {Folder} folders
   * @param {String} id
   */
  static deleteChildFolder (folders, id) {
    folders.childFolders = folders.childFolders.filter((folder) => folder.id !== id)
    return folders
  }

  /**
   * フォルダーIDとidが等しいかどうか
   *
   * @param {Folder} folders
   * @param {Number|String} id
   */
  static isEqualFolderID (folders, id) {
    const num = isNumber(id) ? id : Number(id)
    return folders.id === num
  }

  /**
   * @param {*} v
   */
  static isFolder (v) {
    return v instanceof Folder
  }

  /**
   * 正しいフォルダーIDか
   *
   * ここでは、引数が整数値か確認している。
   *
   * @param {*} id
   */
  static isvalidFolderID (id) {
    const num = isNumber(id) ? id : Number(id)
    return Number.isInteger(num) && num > 0
  }

  static pushPost (folder, post) {
    const newFolder = Object.assign({}, folder)

    if (post instanceof Post) {
      newFolder.posts.push(post)
      return newFolder
    }

    newFolder.posts.push(new Post(post))
    return newFolder
  }

  static pushChildFolder (folder, newChildFolder) {
    const newFolder = Object.assign({}, folder)

    if (newChildFolder instanceof Folder) {
      newFolder.childFolders.push(newChildFolder)
      return newFolder
    }

    newFolder.childFolders.push(new Folder(newChildFolder))
    return newFolder
  }

  static updatePost (folder, id, post) {
    const newFolder = Object.assign({}, folder)
    const idx = newFolder.posts.findIndex((posts) => posts.id === id)

    if (idx === -1) {
      return newFolder
    }

    newFolder.posts[idx] = post instanceof Post
      ? post
      : new Folder(post)

    return newFolder
  }

  static updateChildFolder (folder, id, newChildFolder) {
    const newFolder = Object.assign({}, folder)
    const idx = newFolder.childFolders.findIndex((folders) => folders.id === id)

    if (idx === -1) {
      return newFolder
    }

    newFolder.childFolders[idx] = newChildFolder instanceof Folder
      ? newChildFolder
      : new Folder(newChildFolder)

    return newFolder
  }
}

export default Folder
