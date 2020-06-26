import Folder from "./Folder"

/**
 * @typedef PostAttributes
 * @property {Array<Object>} ancestor-folders
 * @property {String} created-at
 * @property {String} content
 * @property {String} name
 * @property {String} public
 * @property {String} user-id
 * @property {String} updated-at
 */

/**
 * @typedef PostNormal
 * @property {String} created_at
 * @property {String} content
 * @property {String} id
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
   * @param {{ id: String, type: String, attributes: PostAttributes }} param0
   */
  withAttributesToPost ({ id, type, attributes }) {
    this.id = id
    this.type = type
    this.name = attributes.name
    this.public = attributes.public
    this.content = attributes.content
    this.userID = attributes["user-id"]
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
    this.id = post.id
    this.type = "posts"
    this.name = post.name
    this.public = post.public
    this.content = post.content
    this.userID = post.user_id
    this.parentID = post.parent_id
    this.createdAt = new Date(post.created_at)
    this.updatedAt = new Date(post.updated_at)
  }
}

export default Post
