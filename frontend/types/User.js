/**
 * @typedef UserAttributes
 * @property {String} address
 * @property {String} created-at
 * @property {String} github-link
 * @property {String} image
 * @property {String} name
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
  }
}

export default User
