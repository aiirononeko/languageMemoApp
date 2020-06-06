<template>
  <div>
    <!-- ファイルやフォルダーのリスト -->
    <blue-btn @click="changeCreatingNewFolder">フォルダーを作成する</blue-btn>
    <v-list v-if="existList">
      <v-list-item-group>
        <v-list-item  v-for="(item, i) in list" :key="i">
          <v-list-item-icon>
            <v-icon>{{ item.folder_id ? "mdi-file" : "mdi-folder" }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="creatingNewFolder  && existList">
          <v-list-item-icon><v-icon>mdi-folder</v-icon></v-list-item-icon>

          <v-list-item-content>
            <v-form @submit="onSubmit">
              <v-list-item-title><v-text-field v-model="newFolderName" dense /></v-list-item-title>
            </v-form>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <div v-else>フォルダやファイルは存在しません。作成してください</div>
    <v-list>
      <v-list-item v-if="creatingNewFolder  && !existList">
        <v-list-item-icon><v-icon>mdi-folder</v-icon></v-list-item-icon>

        <v-list-item-content>
          <v-form @submit="onSubmit">
            <v-list-item-title><v-text-field v-model="newFolderName" dense /></v-list-item-title>
          </v-form>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <link-to-back-item />
  </div>
</template>

<script>
import LinkToBackItem from '~/components/organisms/list/LinkToBackItem'
import BlueBtn from '~/components/atoms/btns/BlueBtn'

export default {
  components: {
    LinkToBackItem,
    BlueBtn
  },

  props: {
    list: {
      type: Array,
      default: undefined
    }
  },

  data: () => ({
    newFolderName: "",
    creatingNewFolder: false
  }),

  computed: {
    existList() {
      return this.list[0]
    }
  },

  methods: {
    changeCreatingNewFolder() {
      this.creatingNewFolder = true
    },

    onSubmit() {
      let newFolderName = this.newFolderName
      this.$emit('submit', newFolderName)
      this.creatingNewFolder = false
      this.newFolderName = ""
      this.$emit('fetchData')
    }
  }
}
</script>

<style>

</style>
