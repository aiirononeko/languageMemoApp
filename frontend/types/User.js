import Folder from "./Folder"
import Post from "./Post"
import { StrOrNumToNumber } from "@/utils/number"

/**
 * @typedef UserAttributes
 * @property {String} address
 * @property {String} created-at
 * @property {Array}  folders
 * @property {String} github-link
 * @property {String} image
 * @property {String} name
 * @property {Array}  posts
 * @property {String} profile
 * @property {String} twitter-link
 * @property {String} updated-at
 * @property {String} username
 */

/**
 * @class User
 */
class User {

  /**
   * @param {{ id: String|Number, type: String, attributes: UserAttributes }} obj
   */
  constructor({ id, type, attributes }) {
    this.id = StrOrNumToNumber(id)
    this.type = type
    this.address = attributes.address
    this.createdAt = new Date(attributes['created-at'])
    this.githubLink = attributes['github-link']
    this.image = attributes.image
    this.name = attributes.name
    this.profile = attributes.profile
    this.twitterLink = attributes['twitter-link']
    this.updatedAt = new Date(attributes['updated-at'])
    this.username = attributes.username

    this.folders = attributes.folders && attributes.folders.length > 0 ?
      attributes.folders.map((folder) => new Folder(folder)) : []
    this.posts = attributes.posts && attributes.posts.length > 0 ?
      attributes.posts.map((post) => new Post(post)) : []
  }

  /**
   *
   * @param {User} user
   * @param {String|Number} id
   */
  static deletePost (user, id) {
    const num = StrOrNumToNumber(id)
    user.posts = user.posts.filter((post) => post.id !== num)
    return user
  }

  /**
   *
   * @param {User} user
   * @param {String|Number} id
   */
  static deleteFolder (user, id) {
    const num = StrOrNumToNumber(id)
    user.folders = user.folders.filter((folder) => folder.id !== num)
    return user
  }

  static isUser = (v) => v instanceof User

  /**
   *
   * @param {User} user
   * @param {Post} post
   */
  static pushPost (user, post) {
    const newUser = Object.assign({}, user)

    if (post instanceof Post) {
      newUser.posts.push(post)
      return newUser
    }

    newUser.posts.push(new Post(post))
    return newUser
  }

  /**
   *
   * @param {User} user
   * @param {Folder} folder
   */
  static pushFolder (user, folder) {
    const newUser = Object.assign({}, user)

    if (folder instanceof Folder) {
      newUser.folders.push(folder)
      return newUser
    }

    newUser.folders.push(new Folder(folder))
    return newUser
  }

  /**
   *
   * @param {User} user
   * @param {String|Number} id
   * @param {Post} newPost
   */
  static updatePost (user, id, newPost) {
    const newUser = Object.assign({}, user)
    const num = StrOrNumToNumber(id)
    const idx = user.posts.findIndex((post) => post.id === num)

    if (idx === -1) {
      return newUser
    }

    newUser.posts[idx] = newPost instanceof Post
      ? newPost
      : new Post(newPost)

    return newUser
  }

  /**
   *
   * @param {User} user
   * @param {String|Number} id
   * @param {Folder} newFolder
   */
  static updateFolder (user, id, newFolder) {
    const newUser = Object.assign({}, user)
    const num = StrOrNumToNumber(id)
    const idx = user.folders.findIndex((folders) => folders.id === num)

    if (idx === -1) {
      return newUser
    }

    newUser.folders[idx] = newFolder instanceof Folder
      ? newFolder
      : new Folder(newFolder)

    return newUser
  }
}

export default User
