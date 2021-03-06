import Post from "./Post"
import { isUnsignedInteger, strOrNumToNumber } from "@/utils/number"
import { cloneDeep } from "@/utils/Helper"

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
    this.id = strOrNumToNumber(id)
    this.type = type
    this.name = attributes.name
    this.public = attributes.public
    this.userID = strOrNumToNumber(attributes["user-id"])
    this.createdAt = new Date(attributes['created-at'])
    this.updatedAt = new Date(attributes['updated-at'])

    if (attributes["ancestor-folders"] && attributes["ancestor-folders"].length > 0) {
      /** @type String */
      this.parentID = strOrNumToNumber(attributes["ancestor-folders"][0].id)
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
    this.id = strOrNumToNumber(folder.id)
    this.type = "folders"
    this.name = folder.name
    this.userID = strOrNumToNumber(folder.user_id)
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
    const newFolder = cloneDeep(folder)
    const num = strOrNumToNumber(id)

    newFolder.posts = newFolder.posts.filter((post) => post.id !== num)
    return newFolder
  }

  /**
   *
   * @param {Folder} folder
   * @param {Number|String} id
   */
  static deleteChildFolder (folder, id) {
    const newFolder = cloneDeep(folder)
    const num = strOrNumToNumber(id)

    newFolder.childFolders = newFolder.childFolders.filter((folder) => folder.id !== num)
    return newFolder
  }


  /**
   * MyPageへのリンクを生成する
   *
   * @param {Folder} folder
   * @param {String} username
   */
  static generateViewLink = (folder, username) => {
    if (folder.ancestorFolders.length === 0) {
      return `/${username}/${folder.id}`
    }

    // 先祖フォルダのデータを使い、階層構造を再現する
    return folder.ancestorFolders.reduce((str, folder) => {
      str += `/${folder.id}`
      return str
    }, `/${username}`)
  }

  /**
   * フォルダーIDとidが等しいかどうか
   *
   * @param {Folder} folder
   * @param {Number|String} id
   */
  static isEqualFolderID = (folder, id) => folder.id === strOrNumToNumber(id)

  /**
   * @param {*} v
   */
  static isFolder = (v) => v instanceof Folder

  /**
   * 正しいフォルダーIDか
   *
   * ここでは、引数が整数値か確認している。
   *
   * @param {String|Number} id
   */
  static isValidFolderID = (id) => isUnsignedInteger(id)

  /**
   * Postを追加する
   *
   * @param {Folder} folder
   * @param {Post} post
   * @returns {Folder}
   */
  static pushPost (folder, post) {
    const newFolder = cloneDeep(folder)

    if (Post.isPost(post)) {
      newFolder.posts.push(post)
      return newFolder
    }

    newFolder.posts.push(new Post(post))
    return newFolder
  }

  /**
   * 子フォルダーを追加する
   *
   * @param {Folder} folder
   * @param {Folder} newChildFolder
   */
  static pushChildFolder (folder, newChildFolder) {
    const newFolder = cloneDeep(folder)

    if (Folder.isFolder(newChildFolder)) {
      newFolder.childFolders.push(newChildFolder)
      return newFolder
    }

    newFolder.childFolders.push(new Folder(newChildFolder))
    return newFolder
  }

  /**
   * Post を更新する
   *
   * @param {Folder} folder
   * @param {Number} id
   * @param {Post} post
   */
  static updatePost (folder, id, post) {
    const newFolder = cloneDeep(folder)
    const num = strOrNumToNumber(id)
    const idx = newFolder.posts.findIndex((posts) => posts.id === num)

    if (idx === -1) {
      return newFolder
    }

    newFolder.posts[idx] = Post.isPost(post)
      ? post
      : new Post(post)

    return newFolder
  }

  /**
   * Child Folder を更新する
   *
   * @param {Folder} folder
   * @param {Number} id
   * @param {Folder} newChildFolder
   */
  static updateChildFolder (folder, id, newChildFolder) {
    const newFolder = cloneDeep(folder)
    const num = strOrNumToNumber(id)
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
