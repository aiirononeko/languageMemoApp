<template>
  <two-column-container>
    <template #left>
      <user-intro-card />
    </template>

    <template #right>
      <h2>あなたのリポジトリ</h2>

      <folder-breadcrumbs />

      <file-folder-list-with-action />
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
    UserIntroCard
  }
}
</script>

<style>

</style>
