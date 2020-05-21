<template>
  <two-column-container leftCols="4" rightCols="6">
    <template #left>
      <user-intro-card :userInfo="userInfo" />
    </template>

    <template #right>
      <h2>あなたのリポジトリ</h2>

      <folder-breadcrumbs />

      <!-- <file-folder-list-with-action /> -->
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
    FolderBreadcrumbs,
    TwoColumnContainer,
    UserIntroCard
  },
  
  props: {
    userInfo: {
      type: Object,
      default: undefined
    }
  }
}
</script>

<style>

</style>
