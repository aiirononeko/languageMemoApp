<template>
  <two-column-container :leftCols="4" :rightCols="6">
    <template #left>
      <user-intro-card :userInfo="userInfo" class="mt-10" />
    </template>

    <template #right>
      <h2 class="text-center">あなたのリポジトリ</h2>

      <folder-breadcrumbs />

      <file-folder-list-with-action @submit="submit" @fetchData="fetchData" :list="list" :isRepository="isRepository" />
    </template>
  </two-column-container>
</template>

<script>
import FileFolderListWithAction from '~/components/organisms/list/FileFolderListWithAction'
import FolderBreadcrumbs from '~/components/organisms/breadcrumbs/FolderBreadcrumbs'
import TwoColumnContainer from '~/components/molecules/containers/TwoColumnContainer'
import UserIntroCard from '~/components/organisms/cards/UserIntroCard'

export default {
  components: {
    FileFolderListWithAction,
    FolderBreadcrumbs,
    TwoColumnContainer,
    UserIntroCard,
  },
  
  props: {
    userInfo: {
      type: Object,
      default: undefined
    }
  },

  data: () => ({
    list: null,
    isRepository: false
  }),

  methods: {
    submit(newFolderName) {
      this.$emit('submit', newFolderName)
    },

    fetchData() {
      this.$emit('fetchData')
    },

    setList() {
      if(this.isRepository) {
        let folders = this.userInfo.attributes.folders ? this.userInfo.attributes.folders : []
        let posts = this.userInfo.attributes.posts ? this.userInfo.attributes.posts : []
        this.list = folders.concat(posts)
      } else {
        let folders = this.userInfo.attributes["child-folders"] ? this.userInfo.attributes["child-folders"] : []
        let posts = this.userInfo.attributes.posts ? this.userInfo.attributes.posts : []
        this.list = folders.concat(posts)
      }
    }
  },

  watch: {
    userInfo: function () {
      this.setList()
    }
  },

  created() {
    this.isRepository = !!this.userInfo.attributes.folders
    
    this.setList()
  }
}
</script>

<style>

</style>
