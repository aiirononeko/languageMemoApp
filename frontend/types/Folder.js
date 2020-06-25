import Post from "./Post"

/**
 * @typedef FolderAttributes
 * @property {Array<Object>} ancestor-folders
 * @property {String} created-at
 * @property {Array<Object>} child-folders
 * @property {String} name
 * @property {Array<Object>} posts
 * @property {String} public
 * @property {String} user-id
 * @property {String} updated-at
 */

/**
 * @typedef FolderNormal
 * @property {String} created_at
 * @property {String} id
 * @property {String} name
 * @property {String} parent_id
 * @property {String} public
 * @property {String} user_id
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
    this.id = id
    this.type = type
    this.name = attributes.name
    this.public = attributes.public
    this.userID = attributes["user-id"]
    this.createdAt = new Date(attributes['created-at'])
    this.updatedAt = new Date(attributes['updated-at'])

    if (attributes["ancestor-folders"]) {
      /** @type String */
      this.parentID = attributes["ancestor-folders"][0].id
      this.ancestorFolders = attributes["ancestor-folders"].map((folder) => new Folder(folder))
    }

    if (attributes["child-folders"]) {
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
    this.id = folder.id
    this.name = folder.name
    this.userID = folder.user_id
    this.public = folder.public
    this.createdAt = new Date(folder.created_at)
    this.updatedAt = new Date(folder.updated_at)
    this.parentID = folder.parent_id
  }
}

export default Folder
