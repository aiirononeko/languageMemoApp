<template>
  <two-column-container
    :left-cols="12"
    :left-sm="4"
    :rightCols="12"
    :right-sm="8"
    bottom-class="flex-column-reverse flex-sm-row"
  >
    <template #left>
      <user-intro-card :userInfo="userInfo" class="mt-10" />
    </template>

    <template #right>
      <v-container>
        <v-row>
          <v-col cols="12" sm="8">
            <h2 class="text-center">あなたのリポジトリ</h2>
          </v-col>
          <v-col cols="12" sm="4" class="text-right">
            <blue-btn @click="onTriggerCreatingNewFolder" class="mb-4">フォルダーを作成する</blue-btn>
            <blue-btn @click="onTriggerCreatingNewFile">ファイルを作成する</blue-btn>
          </v-col>
        </v-row>
      </v-container>

      <folder-breadcrumbs
        :breadCrumbs="breadCrumbs"
        :current-username="currentUsername"
        :currentFolderName="isRepository ? '' : currentFolderName"
      />

      <file-folder-list-with-action
        :list="list"
        :ancestor-folders="ancestorFolders"
        :current-username="currentUsername"
        :folders-info="foldersInfo"
        :isRepository="isRepository"
        :is-creating-new-folder="isCreatingNewFolder"
        :is-creating-new-file="isCreatingNewFile"
        :parent-params="parentParams"
        @create-file="onCreateFile"
        @create-folder="onCreateFolder"
      />
    </template>
  </two-column-container>
</template>

<script>
const FileFolderListWithAction = () => import('~/components/organisms/list/FileFolderListWithAction')
const FolderBreadcrumbs = () => import('~/components/organisms/breadcrumbs/FolderBreadcrumbs')
const TwoColumnContainer = () => import('~/components/molecules/containers/TwoColumnContainer')
const UserIntroCard = () => import('~/components/organisms/cards/UserIntroCard')
const BlueBtn = () => import('~/components/atoms/btns/BlueBtn')

/**
 * パンくずリストの作成
 */
const generateBreadcrumbs = (username, ancestorFolders) => {
  const rootBreadCrumbs = [{ to: username, name: `${username}`, isRepo: true }]
  const reAncestorFolders = Object.assign([], ancestorFolders).reverse()

  const ancestorBreadCrumbs = reAncestorFolders.map(
    (folder) => ({ to: folder.id , name: `${folder.name}`, isRepo: false })
  )

  const breadCrumbs = [...rootBreadCrumbs, ...ancestorBreadCrumbs]
  return breadCrumbs
}

export default {
  components: {
    FileFolderListWithAction,
    FolderBreadcrumbs,
    TwoColumnContainer,
    UserIntroCard,
    BlueBtn
  },

  props: {
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

    parentParams: {
      type: String,
      default: undefined
    },

    isCreatingNewFolder: {
      type: Boolean,
      default: false
    },

    isCreatingNewFile: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    /**
     * 祖先のフォルダの情報を配列形式で返す
     *
     * @returns { Array<import('~/types/Folder').default> }
     */
    ancestorFolders() {
      if (!this.foldersInfo) {
        return undefined
      }

      return this.foldersInfo.ancestorFolders
    },

    /**
     * ルートから親フォルダまでの各idとisRepoを返す
     *
     * @returns { { to: Number , name: String, isRepo: Boolean }[] }
     */
    breadCrumbs() {
      return generateBreadcrumbs(this.currentUsername, this.ancestorFolders)
    },

    currentFolderName() {
      return this.foldersInfo && this.foldersInfo.name
    },

    isRepository() {
      return !this.foldersInfo
    },

    list() {
      return this.foldersInfo
        ? [...this.foldersInfo.childFolders, ...this.foldersInfo.posts]
        : [...this.userInfo.folders, ...this.userInfo.posts]
    },

    params() {
      return this.$route.params
    },
  },

  methods: {
    onCreateFile(v) {
      return this.$emit('create-file', v)
    },

    onCreateFolder(v) {
      return this.$emit('create-folder', v)
    },

    onTriggerCreatingNewFolder() {
      return this.$emit('trigger-creating-new-folder')
    },

    onTriggerCreatingNewFile() {
      return this.$emit('trigger-creating-new-file')
    }
  },
}
</script>

<style>

</style>
