<template>
  <div>
    <p v-if="!existList">フォルダやファイルは存在しません。作成してください</p>

    <v-list>
      <v-list-item-group>
        <link-to-back-item v-if="!isRepository" :to="toBackFolder" />

        <template v-if="existList">
          <span v-for="item in list" :key="item.id">
            <file-list-item v-if="!!item.content" :name="item.name" :id="item.id" :username="username" />
            <folder-list-item v-else :name="item.name" :id="item.id" :username="username" />
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

    parentId() {
      return !!this.ancestorFolders.length && this.ancestorFolders[0].id
    },

    toBackFolder() {
      if(this.parentId) {
        return `/${this.currentUsername}/${this.parentId}`
      }else {
        return `/${this.currentUsername}`
      }
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
