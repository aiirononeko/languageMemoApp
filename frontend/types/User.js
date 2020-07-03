import DEFAULT_AVATAR from '~/assets/images/default_avatar_icon1.png'
import Folder from "./Folder"
import Post from "./Post"
import { StrOrNumToNumber, isUnsignedInteger } from "@/utils/number"
import { isAlphaNumUnderScore } from '@/utils/string'
import cloneDeep from 'lodash.clonedeep'

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

  constructor(user) {
    if (user.attributes) {
      this.withAttributesToUser(user)
    }
  }

  /**
   * @param {{ id: String|Number, type: String, attributes: UserAttributes }} obj
   */
  withAttributesToUser = ({ id, type, attributes }) => {
    this.id = StrOrNumToNumber(id)
    this.type = type
    this.address = attributes.address
    this.createdAt = new Date(attributes['created-at'])
    this.githubLink = attributes['github-link']
    /** @type {String} */
    this.image = attributes.image || DEFAULT_AVATAR
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
   * 指定した id の Post を削除する
   *
   * @param {User} user
   * @param {String|Number} id
   */
  static deletePost (user, id) {
    const newUser = cloneDeep(user)
    const num = StrOrNumToNumber(id)

    newUser.posts = newUser.posts.filter((post) => post.id !== num)
    return newUser
  }

  /**
   * 指定した id のフォルダーを削除する
   *
   * @param {User} user
   * @param {String|Number} id
   */
  static deleteFolder (user, id) {
    const newUser = cloneDeep(user)
    const num = StrOrNumToNumber(id)

    newUser.folders = newUser.folders.filter((folder) => folder.id !== num)
    return newUser
  }

  static isUser = (v) => v instanceof User

  /**
   * 有効なUserIDか
   *
   * @param {String|Number} id
   */
  static isValidID = (id) => isUnsignedInteger(id)

  /**
   * 有効なusernameか
   *
   * @param {String} username
   */
  static isValidUsername = (username) => isAlphaNumUnderScore(username) && username.length < 31

  /**
   * Post を追加する
   *
   * @param {User} user
   * @param {Post} post
   */
  static pushPost (user, post) {
    const newUser = cloneDeep(user)

    if (post instanceof Post) {
      newUser.posts.push(post)
      return newUser
    }

    newUser.posts.push(new Post(post))
    return newUser
  }

  /**
   * フォルダー を追加
   *
   * @param {User} user
   * @param {Folder} folder
   */
  static pushFolder (user, folder) {
    const newUser = cloneDeep(user)

    if (folder instanceof Folder) {
      newUser.folders.push(folder)
      return newUser
    }

    newUser.folders.push(new Folder(folder))
    return newUser
  }

  /**
   * 指定した id のPostを更新する
   *
   * @param {User} user
   * @param {String|Number} id
   * @param {Post} newPost
   */
  static updatePost (user, id, newPost) {
    const newUser = cloneDeep(user)
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
   * 指定した id のフォルダーを更新する
   *
   * @param {User} user
   * @param {String|Number} id
   * @param {Folder} newFolder
   */
  static updateFolder (user, id, newFolder) {
    const newUser = cloneDeep(user)
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
