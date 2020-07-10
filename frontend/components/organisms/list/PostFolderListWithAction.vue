<template>
  <div>
    <p v-if="!list">フォルダやファイルは存在しません。作成してください</p>

    <v-list>
      <v-list-item-group>
        <link-to-back-item v-if="!isRoot" :to="toBackFolder" />

        <!-- 登録済みのファイルやフォルダー -->
        <template v-for="(item, key) in list" >
          <post-list-item
            v-if="item.type === 'posts'"
            :can-action="true"
            :name="item.name"
            :id="item.id"
            :to="`${currentPath}/${item.uid}`"
            :key="key"
            @change-name="onChangeFileName"
            @delete="onDeletePost"
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
        <create-post-list-item v-if="isCreatingNewPost" v-model="newPostName" @submit="onCreatePost" />
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
export default {
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

    isCreatingNewPost: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    newFolderName: "",
    newPostName: ""
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

    onCreatePost() {
      this.$emit('create-post', this.newPostName)
      this.newPostName = ""
    },

    onChangeFileName(v) {
      return this.$emit('change-post-name', v)
    },

    onChangeFolderName(v) {
      return this.$emit('change-folder-name', v)
    },

    onDeletePost(v) {
      return this.$emit('delete-post', v)
    },

    onDeleteFolder(v) {
      return this.$emit('delete-folder', v)
    }
  }
}
</script>

<style>

</style>
