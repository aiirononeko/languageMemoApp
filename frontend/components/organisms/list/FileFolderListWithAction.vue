<template>
  <div>
    <p v-if="!list">フォルダやファイルは存在しません。作成してください</p>

    <v-list>
      <v-list-item-group>
        <link-to-back-item v-if="!isRoot" :to="toBackFolder" />

        <!-- 登録済みのファイルやフォルダー -->
        <template v-for="(item, key) in list" >
          <file-list-item
            v-if="item.type === 'posts'"
            :can-action="true"
            :name="item.name"
            :id="item.id"
            :to="`${currentPath}/${item.id}`"
            :key="key"
            @change-name="onChangeFileName"
            @delete="onDeleteFile"
          />

          <folder-list-item
            v-else
            :can-action="true"
            :name="item.name"
            :to="`${currentPath}/${item.id}`"
            :id="item.id"
            :key="key"
            @change-name="onChangeFolderName"
            @delete="onDeleteFolder"
          />
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
    currentUsername: {
      type: String,
      default: ""
    },

    /**
     * 現在アクセスしているパス
     */
    currentPath: {
      type: String,
      default: "/"
    },

    /**
     * ファイルやフォルダーの一覧
     */
    list: {
      type: Array,
      default: () => []
    },

    /**
     * 最上位層か (user 直下か)
     */
    isRoot: {
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
    // 一つ前のリンク
    toBackFolder() {
      if (this.isRoot) {
        return undefined
      }

      return this.currentPath.substr( 0, this.currentPath.lastIndexOf("/") )
    },
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
      return this.$emit('change-file-name', v)
    },

    onChangeFolderName(v) {
      return this.$emit('change-folder-name', v)
    },

    onDeleteFile(v) {
      return this.$emit('delete-file', v)
    },

    onDeleteFolder(v) {
      return this.$emit('delete-folder', v)
    }
  }
}
</script>

<style>

</style>
