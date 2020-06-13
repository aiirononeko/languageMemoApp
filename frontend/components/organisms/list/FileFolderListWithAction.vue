<template>
  <div>
   <p v-if="!existList">フォルダやファイルは存在しません。作成してください</p>
    
    <v-list>
      <v-list-item-group>
        <link-to-back-item v-if="!isRepository" @toBackFolder="toBackFolder" />

        <template v-if="existList">
          <span v-for="item in list" :key="item.id">
            <file-list-item v-if="!!item.content" :name="item.name" item.id :username="username" />
            <folder-list-item else :name="item.name" :id="item.id" :username="username" />
          </span>
        </template>

        <v-list-item v-if="isCreatingNewFolder">
          <v-list-item-icon><v-icon>mdi-folder</v-icon></v-list-item-icon>

          <v-list-item-content>
            <v-form @submit="onSubmit">
              <v-list-item-title><v-text-field v-model="newFolderName" dense /></v-list-item-title>
            </v-form>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
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
    LinkToBackItem,
  },

  props: {
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
    }
  },

  data: () => ({
    newFolderName: "",
  }),

  computed: {
    existList() {
      return !!this.list.length
    },

    username() {
      return this.$store.getters["authentication/username"]
    }
  },

  methods: {
    onSubmit() {
      let newFolderName = this.newFolderName
      this.$emit('submit', newFolderName)
      
      this.newFolderName = ""
    },

    toBackFolder() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>

</style>
