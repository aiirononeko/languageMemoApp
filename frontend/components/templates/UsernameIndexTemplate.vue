<template>
  <two-column-container :leftCols="4" :rightCols="8">
    <template #left>
      <user-intro-card :userInfo="userInfo" class="mt-10" />
    </template>

    <template #right>
      <v-container>
        {{ ancestorFolders }}<br/>
        {{ breadCrumbs }}
        <v-row>
          <v-col cols="8"><h2 class="text-center">あなたのリポジトリ</h2></v-col>
          <v-col cols="4"><blue-btn @click="$emit('triggerIsCreatingNewFolder')">フォルダーを作成する</blue-btn></v-col>
        </v-row>
      </v-container>

      <folder-breadcrumbs />

      <file-folder-list-with-action 
        @submit="(newFolderName) => $emit('submit' ,newFolderName)" 
        :list="list" 
        :isRepository="isRepository" 
        :isCreatingNewFolder="isCreatingNewFolder"
      />
    </template>
  </two-column-container>
</template>

<script>
import FileFolderListWithAction from '~/components/organisms/list/FileFolderListWithAction'
import FolderBreadcrumbs from '~/components/organisms/breadcrumbs/FolderBreadcrumbs'
import TwoColumnContainer from '~/components/molecules/containers/TwoColumnContainer'
import UserIntroCard from '~/components/organisms/cards/UserIntroCard'
import BlueBtn from '~/components/atoms/btns/BlueBtn'

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
    list() {
      if(this.isRepository) {
        const folders = this.userInfo.attributes.folders || []
        const posts = this.userInfo.attributes.posts || []
        return [...folders, ...posts]
      } else {
        const folders = this.foldersInfo.attributes["child-folders"] || []
        const posts = this.foldersInfo.attributes.posts || []
        return [...folders, ...posts]
      }
    },

    ancestorFolders() {
      return (
        this.foldersInfo 
        && this.foldersInfo.attributes 
        && this.foldersInfo.attributes["ancestor-folders"] 
        || []
      )
    },

    breadCrumbs() {
      // TODO: usernameとカレントディレクトリを前後に追加
      let breadCrumbs = "username"
      breadCrumbs = this.ancestorFolders.reduce((breadCrumbs, folder) => (`${folder.name}/${breadCrumbs}`), breadCrumbs)
      return breadCrumbs
    },

    isRepository() {
      return !this.foldersInfo
    }
  },
}
</script>

<style>

</style>
