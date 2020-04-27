<template>
  <div>
    <!-- ファイルやフォルダーのリスト -->
    <!-- 編集や削除のアクションがないList -->
    <file-folder-list-title-item />
  </div>
</template>

<script>
import FileListItem from '~/components/organisms/list/FileListItem'
import FileFolderListTitleItem from '~/components/organisms/list/FileFolderListTitleItem'
import FolderListItem from '~/components/organisms/list/FolderListItem'

export default {
  components: {
    FileListItem,
    FileFolderListTitleItem,
    FolderListItem
  }
}
</script>

<style>

</style>
