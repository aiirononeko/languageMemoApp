<template>
  <div>
    <p v-if="!existList">フォルダやファイルは存在しません。作成してください</p>

    <v-list>
      <v-list-item-group>
        <link-to-back-item v-if="!isRepository" :to="toBackFolder" />

        <template v-if="existList">
          <template v-for="(item, key) in list" >
            <file-list-item
              v-if="!!item.content"
              :can-action="true"
              :name="item.name"
              :id="item.id"
              :to="`${nowLink}/${item.id}`"
              :key="key"
              @change-name="onChangeFileName"
              @delete="onDeleteFile"
            />

            <folder-list-item
              v-else
              :can-action="true"
              :name="item.name"
              :to="`${nowLink}/${item.id}`"
              :id="item.id"
              :key="key"
              @change-name="onChangeFolderName"
              @delete="onDeleteFolder"
            />
          </template>
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
    },

    onChangeFileName(v) {
      this.$emit('change-file-name', v)
    },

    onChangeFolderName(v) {
      this.$emit('change-folder-name', v)
    },

    onDeleteFile(v) {
      this.$emit('delete-file', v)
    },

    onDeleteFolder(v) {
      this.$emit('delete-folder', v)
    }
  }
}
</script>

<style>

</style>
