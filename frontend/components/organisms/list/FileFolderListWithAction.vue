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

        <!-- folder, file の新規作成時に表示 -->
        <create-folder-list-item v-if="isCreatingNewFolder" v-model="newFolderName" @submit="onCreateFolder" />
        <create-file-list-item v-if="isCreatingNewFile" v-model="newFileName" @submit="onCreateFile" />
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
const CreateFileListItem = () => import('~/components/organisms/list/CreateFileListItem')
const CreateFolderListItem = () => import('~/components/organisms/list/CreateFolderListItem')
const FileListItem = () => import('~/components/organisms/list/FileListItem')
const FolderListItem = () => import('~/components/organisms/list/FolderListItem')
const LinkToBackItem = () => import('~/components/organisms/list/LinkToBackItem')

export default {
  components: {
    CreateFileListItem,
    CreateFolderListItem,
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
    },

    isCreatingNewFolder: {
      type: Boolean,
      default: false
    },

    isCreatingNewFile: {
      type: Boolean,
      default: false
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

    username() {
      return this.$store.getters["authentication/username"]
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
  },

  methods: {
    onCreateFolder() {
      this.$emit('create-folder', this.newFolderName)
      this.newFolderName = ""
    },

    onCreateFile() {
      this.$emit('create-file', this.newFileName)
      this.newFileName = ""
    }
  }
}
</script>

<style>

</style>
