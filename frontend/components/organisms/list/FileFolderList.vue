<template>
  <div>
    <p v-if="!existList">フォルダやファイルは存在しません。作成してください</p>

    <v-list>
      <v-list-item-group>
        <link-to-back-item v-if="!isRepository" :to="toBackFolder" />

        <template v-if="existList">
          <span v-for="item in list" :key="item.id">
            <file-list-item v-if="!!item.content" :name="item.name" :to="`${nowLink}/${item.id}`" />
            <folder-list-item v-else :name="item.name" :to="`${nowLink}/${item.id}`" />
          </span>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
const FileListItem = () => import('~/components/organisms/list/FileListItem')
const FolderListItem = () => import('~/components/organisms/list/FolderListItem')
const LinkToBackItem = () => import('~/components/organisms/list/LinkToBackItem')

export default {
  components: {
    FileListItem,
    FolderListItem,
    LinkToBackItem,
  },

  props: {
    ancestorFolders: {
      type: Array,
      default: () => []
    },

    currentUsername: {
      type: String,
      default: ""
    },

    foldersInfo: {
      type: Object,
      default: undefined
    },

    parentParams: {
      type: String,
      default: undefined
    },

    list: {
      type: Array,
      default: () => []
    },

    isRepository: {
      type: Boolean,
      default: undefined
    }
  },

  data: () => ({
    newFolderName: "",
    newFileName: ""
  }),

  computed: {
    existList() {
      return !!this.list.length
    },

    // 一つ前のリンク
    toBackFolder() {
      if (this.parentParams) {
        return this.nowLink.substr( 0, this.nowLink.lastIndexOf("/") )
      }

      return this.nowLink
    },

    // 現在のリンク
    nowLink() {
      if (this.parentParams) {
        return `/${this.currentUsername}/${this.parentParams}`
      }

      return `/${this.currentUsername}`
    }
  }
}
</script>

<style>

</style>
