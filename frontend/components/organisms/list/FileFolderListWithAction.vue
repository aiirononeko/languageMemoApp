<template>
  <div>
    <v-list v-if="existList">
      <v-list-item-group>
        <link-to-back-item v-if="!isRepository" @toBackFolder="toBackFolder" />

        <span v-for="item in list" :key="item.id">
          <file-list-item v-if="!!item.content" :name="item.name" item.id :username="username" />
          <folder-list-item else :name="item.name" :id="item.id" :username="username" />
        </span>

        <v-list-item v-if="isCreatingNewFolder && existList">
          <v-list-item-icon><v-icon>mdi-folder</v-icon></v-list-item-icon>

          <v-list-item-content>
            <v-form @submit="onSubmit">
              <v-list-item-title><v-text-field v-model="newFolderName" dense /></v-list-item-title>
            </v-form>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <div v-else>
      <p>フォルダやファイルは存在しません。作成してください</p> 
      <v-list>
        <v-list-item-group>
          <link-to-back-item v-if="!isRepository" @toBackFolder="toBackFolder" />

          <v-list-item v-if="isCreatingNewFolder && !existList">
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
      default: undefined
    },

    isRepository: {
      type: Boolean,
      default: undefined
    },

    isCreatingNewFolder: {
      type: Boolean,
      default: undefined
    }
  },

  data: () => ({
    newFolderName: "",
  }),

  computed: {
    existList() {
      return this.list[0]
    },

    username() {
      return this.$store.getters["authetication/username"]
    }
  },

  methods: {
    onSubmit() {
      let newFolderName = this.newFolderName
      this.$emit('submit', newFolderName)

      this.$emit('triggerIsCreatingNewFolder')
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
