<template>
  <div>
    <!-- ファイルやフォルダーのリスト -->
    <!-- 編集や削除のアクションがないList -->
    <file-folder-list-title-item />
  </div>
</template>

<script>
// const FileListItem = () => import('~/components/organisms/list/FileListItem')
const FileFolderListTitleItem = () => import('~/components/organisms/list/FileFolderListTitleItem')
// const FolderListItem = () => import('~/components/organisms/list/FolderListItem')

export default {
  components: {
    // FileListItem,
    FileFolderListTitleItem,
    // FolderListItem
  }
}
</script>

<style>

</style>
