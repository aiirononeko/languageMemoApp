<template>
  <two-column-container :leftCols="4" :rightCols="8">
    <template #left>
      <user-intro-card :userInfo="userInfo" class="mt-10" />
    </template>

    <template #right>
      <v-container>
        <v-row>
          <v-col cols="8"><h2 class="text-center">あなたのリポジトリ</h2></v-col>
          <v-col cols="4"><blue-btn @click="$emit('triggerIsCreatingNewFolder')">フォルダーを作成する</blue-btn></v-col>
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
import cloneDeep from 'lodash.clonedeep'

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
    ancestorFolders() {
      return (
        this.foldersInfo 
        && this.foldersInfo.attributes 
        && this.foldersInfo.attributes["ancestor-folders"] 
        || []
      )
    },

    breadCrumbs() {
      let breadCrumbs = [{ to: this.currentUsername, name: `${this.currentUsername}`, isRepo: true }]
      const reAncestorFolders = cloneDeep(this.ancestorFolders).reverse()

      let ancestorBreadCrumbs = reAncestorFolders.map(
        (folder) => ({ to: folder.id , name: `${folder.name}`, isRepo: false })
      )

      breadCrumbs = [...breadCrumbs, ...ancestorBreadCrumbs]
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
        const folders = this.userInfo.attributes.folders || []
        const posts = this.userInfo.attributes.posts || []
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
