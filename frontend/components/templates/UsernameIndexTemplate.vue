<template>
  <two-column-container :leftCols="4" :rightCols="8">
    <template #left>
      <user-intro-card :userInfo="userInfo" class="mt-10" />
    </template>

    <template #right>
      <v-container>
        <v-row>
          <v-col cols="8"><h2 class="text-center">あなたのリポジトリ</h2></v-col>
          <v-col cols="4"><blue-btn @click="changeCreatingNewFolder">フォルダーを作成する</blue-btn></v-col>
        </v-row>
      </v-container>

      <folder-breadcrumbs />

      <file-folder-list-with-action 
        @submit="submit" 
        @fetchData="fetchData" 
        :list="list" 
        :isRepository="isRepository" 
        :creatingNewFolder="creatingNewFolder" 
        @changeCreatingNewFolder="changeCreatingNewFolder" 
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
    }
  },

  data: () => ({
    list: null,
    isRepository: false,
    creatingNewFolder: false
  }),

  methods: {
    changeCreatingNewFolder() {
      this.creatingNewFolder = !this.creatingNewFolder
    },

    submit(newFolderName) {
      this.$emit('submit', newFolderName)
    },

    fetchData() {
      this.$emit('fetchData')
    },

    setList() {
      if(this.isRepository) {
        let folders = this.userInfo.folders ? this.userInfo.folders : []
        let posts = this.userInfo.posts ? this.userInfo.posts : []
        this.list = folders.concat(posts)
      } else {
        let folders = this.foldersInfo.attributes["child-folders"] ? this.foldersInfo.attributes["child-folders"] : []
        let posts = this.foldersInfo.attributes.posts ? this.foldersInfo.attributes.posts : []
        this.list = folders.concat(posts)
      }
    }
  },

  watch: {
    userInfo: function () {
      this.setList()
    },

    foldersInfo: function() {
      this.setList()
    }

  },

  created() {
    this.isRepository = !this.foldersInfo

    this.setList()
  }
}
</script>

<style>

</style>
