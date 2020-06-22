import DEFAULT_AVATAR from '~/assets/images/default_avatar_icon1.png'

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
    this.folders = attributes.folders
    this.githubLink = attributes['github-link']
    /** @type {String} */
    this.image = attributes.image || DEFAULT_AVATAR
    this.name = attributes.name
    this.posts = attributes.posts
    this.profile = attributes.profile
    this.twitterLink = attributes['twitter-link']
    this.updatedAt = new Date(attributes['updated-at'])
    this.username = attributes.username
  }
}

export default User
