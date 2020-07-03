import cloneDeep from "lodash.clonedeep"
import Folder from "@/types/Folder"
import Post from "@/types/Post"
import User from "@/types/User"

const demoFolderObj = {
  id: 1,
  type: "folders",
  attributes: {
    public: true,
    name: "mimitaruのフォルダー",
    "user-id": 1,
    "ancestor-folders": [],
    "child-folders": []
  }
}

const demoFolderObj2 = {
  id: 2,
  type: "folders",
  attributes: {
    public: true,
    name: "mimitaruのアルゴリズム図鑑",
    "user-id": 1,
    "ancestor-folders": [],
    "child-folders": []
  }
}

const demoPostObj = {
  id: 1,
  type: "posts",
  attributes: {
    public: true,
    name: "mimitaruの投稿",
    "user-id": 1,
    "ancestor-folders": []
  }
}

const demoPostObj2 = {
  id: 2,
  type: "posts",
  attributes: {
    public: true,
    name: "mimitaruのtypescript tips",
    "user-id": 1,
    "ancestor-folders": []
  }
}

const demoUserObj = {
  id: 1,
  type: "users",
  attributes: {
    name: "ミミタル",
    username: "mimitaru",
    folders: [],
    posts: []
  }
}

describe('types/User', () => {

  describe('new User', () => {
    it('正常に new できる', () => {
      expect(new User(Object.assign({}, demoUserObj))).toBeInstanceOf(User)
    })
  })

  describe('pushPost', () => {
    it('正常に Post を追加できる (Post が 0 → 1 のとき)', () => {
      const userObj = cloneDeep(demoUserObj)
      const postObj = cloneDeep(demoPostObj)

      const expectUser = User.pushPost(new User(userObj), postObj)
      expect(userObj.attributes.posts).toHaveLength(0) // 非破壊か
      expect(expectUser).toBeInstanceOf(User)          // Objectにキャストされていないか
      expect(expectUser.posts).toHaveLength(1)
      expect(expectUser.posts[0]).toBeInstanceOf(Post)
    })

    it('正常に Post を追加できる (Post が 1 → 2 のとき)', () => {
      const userObj = cloneDeep(demoUserObj)
      userObj.attributes.posts.push(cloneDeep(demoPostObj)) // 最初に1つ目のPostを入れる

      const expectUser = User.pushPost(new User(userObj), cloneDeep(demoPostObj2))
      expect(userObj.attributes.posts).toHaveLength(1) // 非破壊か
      expect(expectUser).toBeInstanceOf(User)          // Objectにキャストされていないか
      expect(expectUser.posts).toHaveLength(2)
      expect(expectUser.posts.every(v => Post.isPost(v))).toBeTruthy()
    })
  })

  describe('pushFolder', () => {
    it('正常に Folder を追加できる (Folder が 0 → 1 のとき)', () => {
      const userObj = cloneDeep(demoUserObj)
      const expectUser = User.pushFolder(new User(userObj), cloneDeep(demoFolderObj))

      expect(userObj.attributes.folders).toHaveLength(0) // 非破壊か
      expect(expectUser).toBeInstanceOf(User)            // Objectにキャストされていないか
      expect(expectUser.folders).toHaveLength(1)
      expect(expectUser.folders[0]).toBeInstanceOf(Folder)
    })

    it('正常に Folder を追加できる (Folder が 1 → 2 のとき)', () => {
      const userObj = cloneDeep(demoUserObj)
      userObj.attributes.folders.push(cloneDeep(demoFolderObj)) // 最初に1つ目のFolderを入れる

      const expectUser = User.pushFolder(new User(userObj), cloneDeep(demoFolderObj2))
      expect(userObj.attributes.folders).toHaveLength(1) // 非破壊か
      expect(expectUser).toBeInstanceOf(User)            // Objectにキャストされていないか
      expect(expectUser.folders).toHaveLength(2)
      expect(expectUser.folders.every(v => Folder.isFolder(v))).toBeTruthy()
    })
  })

  describe('updatePost', () => {
    it('正常に Post を更新できる', () => {
      const userObj = cloneDeep(demoUserObj)
      const postObj = cloneDeep(demoPostObj)
      // 最初に1つ目のPostを入れる
      const user = User.pushPost(new User(userObj), cloneDeep(demoPostObj))

      const updatePostObj = cloneDeep(demoPostObj)
      updatePostObj.attributes.name = "ミミタルの投稿を更新"
      const expectUser = User.updatePost(user, postObj.id, updatePostObj)
      expect(user.posts).toHaveLength(1)       // 元のUserに影響を与えていないことを確認
      expect(expectUser).toBeInstanceOf(User)
      expect(expectUser.posts).toHaveLength(1)
      expect(expectUser.posts[0]).toBeInstanceOf(Post)
      expect(expectUser.posts[0].name).toBe("ミミタルの投稿を更新")
    })

    it('指定した id がないとき、入力値を返却する', () => {
      const userObj = cloneDeep(demoUserObj)
      const postObj = cloneDeep(demoPostObj)
      // 最初に1つ目のPostを入れる
      const user = User.pushPost(new User(userObj), postObj)

      const updatePostObj = cloneDeep(demoPostObj)
      updatePostObj.attributes.name = "ミミタルの投稿を更新"
      const expectUser = User.updatePost(user, postObj.id + 1000, updatePostObj)
      expect(user.posts).toHaveLength(1)       // 元のUserに影響を与えていないことを確認
      expect(expectUser).toBeInstanceOf(User)
      expect(expectUser.posts).toHaveLength(1)
      expect(expectUser.posts[0]).toBeInstanceOf(Post)
      expect(expectUser.posts[0].name).toBe(postObj.attributes.name)
    })
  })

  describe('updateFolder', () => {
    it('正常に Folder を更新できる', () => {
      const userObj = cloneDeep(demoUserObj)
      // 最初に1つ目のFolderを入れる
      const user = User.pushFolder(new User(userObj), cloneDeep(demoFolderObj))

      const updateFolderObj = cloneDeep(demoFolderObj)
      updateFolderObj.attributes.name = "ミミタルのフォルダーを更新"
      const expectUser = User.updateFolder(user, 1, updateFolderObj)
      expect(user.folders).toHaveLength(1)       // 元のUserに影響を与えていないことを確認
      expect(expectUser).toBeInstanceOf(User)
      expect(expectUser.folders).toHaveLength(1)
      expect(expectUser.folders[0]).toBeInstanceOf(Folder)
      expect(expectUser.folders[0].name).toBe("ミミタルのフォルダーを更新")
    })

    it('指定した id がないとき、入力値を返却する', () => {
      const userObj = cloneDeep(demoUserObj)
      const folderObj = cloneDeep(demoFolderObj)
      // 最初に1つ目のPostを入れる
      const user = User.pushFolder(new User(userObj), folderObj)

      const updateFolderObj = cloneDeep(demoFolderObj)
      updateFolderObj.attributes.name = "ミミタルのフォルダーを更新"
      const expectUser = User.updatePost(user, folderObj.id + 1000, updateFolderObj)
      expect(user.folders).toHaveLength(1)       // 元のUserに影響を与えていないことを確認
      expect(expectUser).toBeInstanceOf(User)
      expect(expectUser.folders).toHaveLength(1)
      expect(expectUser.folders[0]).toBeInstanceOf(Folder)
      expect(expectUser.folders[0].name).toBe(folderObj.attributes.name)
    })
  })

  describe('deletePost', () => {
    it('正常に Post を削除できる', () => {
      const userObj = cloneDeep(demoUserObj)
      const postObj = cloneDeep(demoPostObj)
      // 最初に1つ目のPostを入れる
      const user = User.pushPost(new User(userObj), postObj)

      const expectUser = User.deletePost(user, postObj.id)
      expect(user.posts).toHaveLength(1)       // 元のUserに影響を与えていないことを確認
      expect(expectUser).toBeInstanceOf(User)
      expect(expectUser.posts).toHaveLength(0)
    })

    it('指定した id がないとき、入力値を返却する', () => {
      const userObj = cloneDeep(demoUserObj)
      const postObj = cloneDeep(demoPostObj)
      // 最初に1つ目のPostを入れる
      const user = User.pushPost(new User(userObj), postObj)

      const expectUser = User.deletePost(user, postObj.id + 1000)
      expect(user.posts).toHaveLength(1)       // 元のUserに影響を与えていないことを確認
      expect(expectUser).toBeInstanceOf(User)
      expect(expectUser.posts).toHaveLength(1)
      expect(expectUser.posts[0]).toBeInstanceOf(Post)
    })
  })

  describe('deleteFolder', () => {
    it('正常に Folder を削除できる', () => {
      const userObj = cloneDeep(demoUserObj)
      const folderObj = cloneDeep(demoFolderObj)
      // 最初に1つ目のFolderを入れる
      const user = User.pushFolder(new User(userObj), folderObj)

      const expectUser = User.deleteFolder(user, folderObj.id)
      expect(user.folders).toHaveLength(1)       // 元のUserに影響を与えていないことを確認
      expect(expectUser).toBeInstanceOf(User)
      expect(expectUser.folders).toHaveLength(0)
    })

    it('指定した id がないとき、入力値を返却する', () => {
      const userObj = cloneDeep(demoUserObj)
      const folderObj = cloneDeep(demoFolderObj)
      // 最初に1つ目のFolderを入れる
      const user = User.pushFolder(new User(userObj), folderObj)

      const expectUser = User.deleteFolder(user, folderObj.id + 1000)
      expect(user.folders).toHaveLength(1)       // 元のUserに影響を与えていないことを確認
      expect(expectUser).toBeInstanceOf(User)
      expect(expectUser.folders).toHaveLength(1)
      expect(expectUser.folders[0]).toBeInstanceOf(Folder)
    })
  })
})
