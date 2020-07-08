import { cloneDeep } from "@/utils/Helper"
import Folder from "@/types/Folder"
import Post from "@/types/Post"

const demoFolderObjAttribiutes = {
  id: 1,
  type: "folders",
  attributes: {
    public: true,
    name: "mimitaruのフォルダー",
    "user-id": 1,
    posts: [],
    "ancestor-folders": [],
    "child-folders": []
  }
}

const demoFolderObjNoAttributes = {
  id: 2,
  type: "folders",
  public: true,
  name: "mimitaruのアルゴリズム図鑑",
  user_id: 1,
  ancestor_folders: [],
  child_folders: [],
  posts: []
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

describe('types/Folder', () => {

  describe('new Folder', () => {
    it('正常に new できる (Attributes あり)', () => {
      expect(new Folder(cloneDeep(demoFolderObjAttribiutes))).toBeInstanceOf(Folder)
    })

    it('正常に new できる (Attributes なし)', () => {
      expect(new Folder(cloneDeep(demoFolderObjNoAttributes))).toBeInstanceOf(Folder)
    })
  })

  describe('pushPost', () => {
    it('正常に Post を追加できる (Post が 0 → 1 のとき)', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      const postObj = cloneDeep(demoPostObj)

      const expectFolder = Folder.pushPost(new Folder(folderObj), postObj)
      expect(folderObj.attributes.posts).toHaveLength(0) // 非破壊か
      expect(expectFolder).toBeInstanceOf(Folder)          // Objectにキャストされていないか
      expect(expectFolder.posts).toHaveLength(1)
      expect(expectFolder.posts[0]).toBeInstanceOf(Post)
    })

    it('正常に Post を追加できる (Post が 1 → 2 のとき)', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      folderObj.attributes.posts.push(cloneDeep(demoPostObj)) // 最初に1つ目のPostを入れる

      const expectFolder = Folder.pushPost(new Folder(folderObj), cloneDeep(demoPostObj2))
      expect(folderObj.attributes.posts).toHaveLength(1) // 非破壊か
      expect(expectFolder).toBeInstanceOf(Folder)          // Objectにキャストされていないか
      expect(expectFolder.posts).toHaveLength(2)
      expect(expectFolder.posts.every(v => Post.isPost(v))).toBeTruthy()
    })
  })

  describe('pushChildFolder', () => {
    it('正常に childFolder を追加できる (childFolder が 0 → 1 のとき)', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      const pushFolderObj = cloneDeep(demoFolderObjNoAttributes)

      const expectFolder = Folder.pushChildFolder(new Folder(folderObj), pushFolderObj)
      expect(folderObj.attributes["child-folders"]).toHaveLength(0) // 非破壊か
      expect(expectFolder).toBeInstanceOf(Folder)          // Objectにキャストされていないか
      expect(expectFolder.childFolders).toHaveLength(1)
      expect(expectFolder.childFolders[0]).toBeInstanceOf(Folder)
    })

    it('正常に childFolder を追加できる (childFolder が 1 → 2 のとき)', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      folderObj.attributes["child-folders"].push(cloneDeep(demoFolderObjAttribiutes)) // 最初に1つ目のFolderを入れる

      const expectFolder = Folder.pushChildFolder(new Folder(folderObj), cloneDeep(demoFolderObjNoAttributes))
      expect(folderObj.attributes["child-folders"]).toHaveLength(1) // 非破壊か
      expect(expectFolder).toBeInstanceOf(Folder)          // Objectにキャストされていないか
      expect(expectFolder.childFolders).toHaveLength(2)
      expect(expectFolder.childFolders.every(v => Folder.isFolder(v))).toBeTruthy()
    })
  })

  describe('updatePost', () => {
    it('正常に Post を更新できる', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      const postObj = cloneDeep(demoPostObj)
      // 最初に1つ目のPostを入れる
      const folders = Folder.pushPost(new Folder(folderObj), postObj)

      const updatePostObj = cloneDeep(demoPostObj)
      updatePostObj.attributes.name = "ミミタルの投稿を更新"
      const expectFolder = Folder.updatePost(folders, postObj.id, updatePostObj)
      expect(folders.posts).toHaveLength(1)       // 元のFolderに影響を与えていないことを確認
      expect(expectFolder).toBeInstanceOf(Folder)
      expect(expectFolder.posts).toHaveLength(1)
      expect(expectFolder.posts[0]).toBeInstanceOf(Post)
      expect(expectFolder.posts[0].name).toBe("ミミタルの投稿を更新")
    })

    it('指定した id がないとき、入力値を返却する', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      const postObj = cloneDeep(demoPostObj)
      // 最初に1つ目のPostを入れる
      const folders = Folder.pushPost(new Folder(folderObj), postObj)

      const updatePostObj = cloneDeep(demoPostObj)
      updatePostObj.attributes.name = "ミミタルの投稿を更新"
      const expectFolder = Folder.updatePost(folders, postObj.id + 1000, updatePostObj)
      expect(folders.posts).toHaveLength(1)       // 元のFolderに影響を与えていないことを確認
      expect(expectFolder).toBeInstanceOf(Folder)
      expect(expectFolder.posts).toHaveLength(1)
      expect(expectFolder.posts[0]).toBeInstanceOf(Post)
      expect(expectFolder.posts[0].name).toBe(postObj.attributes.name)
    })
  })

  describe('updateChildFolder', () => {
    it('正常に Post を更新できる', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      const folderAddObj = cloneDeep(demoFolderObjNoAttributes)
      // 最初に1つ目のPostを入れる
      const folders = Folder.pushChildFolder(new Folder(folderObj), folderAddObj)

      const updateChildFolderObj = cloneDeep(demoFolderObjAttribiutes)
      updateChildFolderObj.attributes.name = "ミミタルの投稿を更新"
      const expectFolder = Folder.updateChildFolder(folders, folderAddObj.id, updateChildFolderObj)
      expect(folders.childFolders).toHaveLength(1)       // 元のFolderに影響を与えていないことを確認
      expect(expectFolder).toBeInstanceOf(Folder)
      expect(expectFolder.childFolders).toHaveLength(1)
      expect(expectFolder.childFolders[0]).toBeInstanceOf(Folder)
      expect(expectFolder.childFolders[0].name).toBe("ミミタルの投稿を更新")
    })

    it('指定した id がないとき、入力値を返却する', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      const folderAddObj = cloneDeep(demoFolderObjNoAttributes)
      // 最初に1つ目のPostを入れる
      const folders = Folder.pushChildFolder(new Folder(folderObj), folderAddObj)

      const updateFolderObj = cloneDeep(demoFolderObjAttribiutes)
      updateFolderObj.attributes.name = "ミミタルの投稿を更新"
      const expectFolder = Folder.updatePost(folders, folderAddObj.id + 1000, updateFolderObj)
      expect(folders.childFolders).toHaveLength(1)       // 元のFolderに影響を与えていないことを確認
      expect(expectFolder).toBeInstanceOf(Folder)
      expect(expectFolder.childFolders).toHaveLength(1)
      expect(expectFolder.childFolders[0]).toBeInstanceOf(Folder)
      expect(expectFolder.childFolders[0].name).toBe(folderAddObj.name)
    })
  })

  describe('deletePost', () => {
    it('正常に Post を削除できる', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      const postObj = cloneDeep(demoPostObj)
      // 最初に1つ目のPostを入れる
      const folders = Folder.pushPost(new Folder(folderObj), postObj)

      const expectFolder = Folder.deletePost(folders, postObj.id)
      expect(folders.posts).toHaveLength(1)       // 元のFolderに影響を与えていないことを確認
      expect(expectFolder).toBeInstanceOf(Folder)
      expect(expectFolder.posts).toHaveLength(0)
    })

    it('指定した id がないとき、入力値を返却する', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      const postObj = cloneDeep(demoPostObj)
      // 最初に1つ目のPostを入れる
      const folders = Folder.pushPost(new Folder(folderObj), postObj)

      const expectFolder = Folder.deletePost(folders, postObj.id + 1000)
      expect(folders.posts).toHaveLength(1)       // 元のFolderに影響を与えていないことを確認
      expect(expectFolder).toBeInstanceOf(Folder)
      expect(expectFolder.posts).toHaveLength(1)
      expect(expectFolder.posts[0]).toBeInstanceOf(Post)
    })
  })

  describe('deleteChildFolder', () => {
    it('正常に Folder を削除できる', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      const folderAddObj = cloneDeep(demoFolderObjNoAttributes)
      // 最初に1つ目のFolderを入れる
      const folders = Folder.pushChildFolder(new Folder(folderObj), folderAddObj)

      const expectFolder = Folder.deleteChildFolder(folders, folderAddObj.id)
      expect(folders.childFolders).toHaveLength(1)       // 元のFolderに影響を与えていないことを確認
      expect(expectFolder).toBeInstanceOf(Folder)
      expect(expectFolder.childFolders).toHaveLength(0)
    })

    it('指定した id がないとき、入力値を返却する', () => {
      const folderObj = cloneDeep(demoFolderObjAttribiutes)
      const folderAddObj = cloneDeep(demoFolderObjNoAttributes)
      // 最初に1つ目のFolderを入れる
      const folders = Folder.pushChildFolder(new Folder(folderObj), folderAddObj)

      const expectFolder = Folder.deleteChildFolder(folders, folderAddObj.id + 1000)
      expect(folders.childFolders).toHaveLength(1)       // 元のFolderに影響を与えていないことを確認
      expect(expectFolder).toBeInstanceOf(Folder)
      expect(expectFolder.childFolders).toHaveLength(1)
      expect(expectFolder.childFolders[0]).toBeInstanceOf(Folder)
    })
  })
})
