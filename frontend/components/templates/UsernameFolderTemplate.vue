<template>
  <TwoColumnContainer
    :left-cols="12"
    :left-sm="4"
    :rightCols="12"
    :right-sm="8"
    bottom-class="flex-column-reverse flex-sm-row"
  >
    <template #left>
      <UserIntroCard :userInfo="userInfo" class="mt-10" />
    </template>

    <template #right>
      <v-container>
        <v-row>
          <v-col cols="12" sm="8">
            <h2 class="text-center main-heading">{{ canAction ? 'あなた' : currentUsername }}のリポジトリ</h2>
          </v-col>
          <v-col v-if="canAction" cols="12" sm="4" class="text-right">
            <BlueBtn @click="onTriggerCreatingNewFolder" class="mb-4">フォルダーを作成する</BlueBtn>
            <BlueBtn @click="onTriggerCreatingNewPost">ファイルを作成する</BlueBtn>
          </v-col>
        </v-row>
      </v-container>

      <FolderBreadcrumbs
        :breadCrumbs="breadCrumbs"
        :currentFolderName="isRoot ? '' : currentFolderName"
      />

      <PostFolderListWithAction
        v-if="canAction"
        :list="list"
        :current-path="currentPath"
        :current-username="currentUsername"
        :is-root="isRoot"
        :is-creating-new-folder="isCreatingNewFolder"
        :is-creating-new-post="isCreatingNewPost"
        @create-folder="onCreateFolder"
        @create-post="onCreatePost"
        @change-folder-name="onChangeFolderName"
        @change-post-name="onChangeFileName"
        @delete-folder="onDeleteFolder"
        @delete-post="onDeletePost"
      />

      <PostFolderList
        v-else
        :list="list"
        :current-path="currentPath"
        :current-username="currentUsername"
        :is-root="isRoot"
      />
    </template>
  </TwoColumnContainer>
</template>

<script>

/**
 * @typedef { import('@/types/Folder').default } Folder
 * @typedef { import('@/types/Post').default } Post
 */

/**
 * パンくずリストの作成
 */
const generateBreadcrumbs = (username, ancestorFolders) => {
  let pastLink = `/${username}`

  const rootBreadCrumbs = [{ to: pastLink, name: `${username}` }]
  const reAncestorFolders = Object.assign([], ancestorFolders).reverse()

  const ancestorBreadCrumbs = reAncestorFolders.map(
    (folder) => {
      pastLink += `/${folder.id}`
      return { to: pastLink , name: `${folder.name}` }
    }
  )

  return [...rootBreadCrumbs, ...ancestorBreadCrumbs]
}

export default {
  props: {
    canAction: {
      type: Boolean,
      default: false
    },

    currentPath: {
      type: String,
      required: true
    },

    currentUsername: {
      type: String,
      required: true
    },

    userInfo: {
      type: Object,
      default: undefined
    },

    foldersInfo: {
      type: Object,
      default: undefined
    },

    isCreatingNewFolder: {
      type: Boolean,
      default: false
    },

    isCreatingNewPost: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * 祖先のフォルダの情報を配列形式で返す
     *
     * @returns { Array<import('@/types/Folder').default> }
     */
    ancestorFolders() {
      if (this.isRoot) {
        return undefined
      }

      return this.foldersInfo.ancestorFolders
    },

    /**
     * ルートから親フォルダまでの各idとisRepoを返す
     *
     * @returns { { to: Number , name: String }[] }
     */
    breadCrumbs() {
      return generateBreadcrumbs(this.currentUsername, this.ancestorFolders)
    },

    /**
     * 現在アクセスしているファルダー名
     */
    currentFolderName() {
      if (this.isRoot) {
        return undefined
      }

      return this.foldersInfo.name
    },

    /**
     * 最上位層か (user 直下か)
     */
    isRoot() {
      return !this.foldersInfo
    },

    /**
     * ファイルやフォルダーの一覧を取得
     *
     * @returns { Array<Folder|Post> }
     */
    list() {
      return this.isRoot
        ? [...this.userInfo.folders, ...this.userInfo.posts]
        : [...this.foldersInfo.childFolders, ...this.foldersInfo.posts]
    },
  },

  methods: {
    onCreatePost(v) {
      return this.$emit('create-post', v)
    },

    onCreateFolder(v) {
      return this.$emit('create-folder', v)
    },

    onChangeFileName(v) {
      return this.$emit('change-post-name', v)
    },

    onChangeFolderName(v) {
      return this.$emit('change-folder-name', v)
    },

    onDeletePost(v) {
      return this.$emit('delete-post', v)
    },

    onDeleteFolder(v) {
      return this.$emit('delete-folder', v)
    },

    onTriggerCreatingNewFolder() {
      return this.$emit('trigger-creating-new-folder')
    },

    onTriggerCreatingNewPost() {
      return this.$emit('trigger-creating-new-post')
    }
  },
}
</script>

<style>

</style>
