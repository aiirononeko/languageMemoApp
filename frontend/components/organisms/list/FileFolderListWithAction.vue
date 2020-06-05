<template>
  <div>
    <!-- ファイルやフォルダーのリスト -->
    <v-list v-if="existList">
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
    <div v-else>フォルダやファイルは存在しません。作成してください</div>
    <link-to-back-item />
  </div>
</template>

<script>
import LinkToBackItem from '~/components/organisms/list/LinkToBackItem'

export default {
  components: {
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

  computed: {
    existList() {
      return this.list[0]
    }
  }
}
</script>

<style>

</style>
