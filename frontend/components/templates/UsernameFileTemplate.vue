<template>
  <two-column-container :leftCols="8" :rightCols="4">
    <template #left>
    </template>

    <template #right>
      <user-intro-card />

      <file-folder-list />
    </template>
  </two-column-container>
</template>

<script>
import FileFolderList from '~/components/organisms/list/FileFolderList'
import FolderBreadcrumbs from '~/components/organisms/breadcrumbs/FolderBreadcrumbs'
import TwoColumnContainer from '~/components/molecules/containers/TwoColumnContainer'
import UserIntroCard from '~/components/organisms/cards/UserIntroCard'

export default {
  components: {
    FileFolderList,
    FolderBreadcrumbs,
    TwoColumnContainer,
    UserIntroCard
  }
}
</script>

<style>

</style>
