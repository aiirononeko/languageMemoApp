<template>
  <div>
    <!-- ファイルやフォルダーのリスト -->
    <v-list>
      <v-list-item-group>
        <v-list-item  v-for="(item, i) in list" :key="i">
          <v-list-item-icon>
            <v-icon>{{ item.isFolder ? "mdi-folder" : "mdi-file" }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <!-- 編集や削除のアクションを付けるList -->
    <link-to-back-item />
    <file-list-item />
    <folder-list-item />
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
  },

  props: {
    // リストを受けとる
    // list: {
    //   type: Array,
    //   default: undefined
    // }
  },

  data: () => ({
    list: [
      {
        title: "Docker",
        isFolder: true
      },
      {
        title: "CSS",
        isFolder: true
      },
      {
        title: "HTML",
        isFolder: true
      },
      {
        title: "MaterialDesgin.md",
        isFolder: false
      },
    ]
  }),
}
</script>

<style>

</style>
