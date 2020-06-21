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
            <blue-btn @click="$emit('triggerIsCreatingNewFolder')">フォルダーを作成する</blue-btn>
          </v-col>
        </v-row>
      </v-container>

      <folder-breadcrumbs
        :breadCrumbs="breadCrumbs"
        :currentUsername="currentUsername"
        :currentFolderName="isRepository ? '' : currentFolderName"
      />

      <file-folder-list-with-action
        @submit="(newFolderName) => $emit('submit' ,newFolderName)"
        :list="list"
        :ancestorFolders="ancestorFolders"
        :currentUsername="currentUsername"
        :isRepository="isRepository"
        :isCreatingNewFolder="isCreatingNewFolder"
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

export default {
  components: {
    FileFolderListWithAction,
    FolderBreadcrumbs,
    TwoColumnContainer,
    UserIntroCard,
    BlueBtn
  },

  props: {
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
    }
  },

  computed: {
    /**
     * 祖先のフォルダの情報を配列形式で返す
     *
     * @returns { Object[] }
     */
    ancestorFolders() {
      return (
        this.foldersInfo
        && this.foldersInfo.attributes
        && this.foldersInfo.attributes["ancestor-folders"]
        || []
      )
    },

    /**
     * ルートから親フォルダまでの各idとisRepoを返す
     *
     * @returns { { to: Number , name: String, isRepo: Boolean }[] }
     */
    breadCrumbs() {
      const rootBreadCrumbs = [{ to: this.currentUsername, name: `${this.currentUsername}`, isRepo: true }]
      const reAncestorFolders = Object.assign([], this.ancestorFolders).reverse()

      const ancestorBreadCrumbs = reAncestorFolders.map(
        (folder) => ({ to: folder.id , name: `${folder.name}`, isRepo: false })
      )

      const breadCrumbs = [...rootBreadCrumbs, ...ancestorBreadCrumbs]
      return breadCrumbs
    },

    currentFolderName() {
      return this.foldersInfo && this.foldersInfo.attributes.name
    },

    currentUsername() {
      return this.$route.params.username
    },

    isRepository() {
      return !this.foldersInfo
    },

    list() {
      if(this.isRepository) {
        const folders = this.userInfo.folders || []
        const posts = this.userInfo.posts || []
        return [...folders, ...posts]
      } else {
        const folders = this.foldersInfo.attributes["child-folders"] || []
        const posts = this.foldersInfo.attributes.posts || []
        return [...folders, ...posts]
      }
    },

    params() {
      return this.$route.params
    },
  },
}
</script>

<style>

</style>
