<template>
  <div>
    <!-- ファイルやフォルダーのリスト -->
    <!-- 編集や削除のアクションを付けるList -->
  </div>
</template>

<script>
import FileListItem from '~/components/organisms/list/FileListItem'
import FolderListItem from '~/components/organisms/list/FolderListItem'
import LinkToBackItem from '~/components/organisms/list/LinkToBackItem'

export default {
  components: {
    FileListItem,
    FolderListItem,
    LinkToBackItem
  }
}
</script>

<style>

</style>
