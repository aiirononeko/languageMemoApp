import Folder from "./Folder"
import Post from "./Post"

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
   * @param {{ id: String, type: String, attributes: UserAttributes }} obj
   */
  constructor({ id, type, attributes }) {
    this.id = id
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
}

export default User
