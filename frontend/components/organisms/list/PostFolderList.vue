<template>
  <div>
    <p v-if="!list">フォルダやファイルは存在しません。</p>

    <v-list>
      <v-list-item-group>
        <LinkToBackItem v-if="!isRoot" :to="toBackFolder" />

        <!-- 登録済みのファイルやフォルダー -->
        <template v-for="(item, key) in list" >
          <PostListItem
            v-if="!!item.content"
            :name="item.name"
            :id="item.id"
            :to="`${currentPath}/${item.uid}`"
            :key="key"
          />

          <FolderListItem
            v-else
            :name="item.name"
            :to="`${currentPath}/${item.id}`"
            :id="item.id"
            :key="key"
          />
        </template>
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
  },

  computed: {
    // 一つ前のリンク
    toBackFolder() {
      if (this.isRoot) {
        return undefined
      }

      return this.currentPath.substr( 0, this.currentPath.lastIndexOf("/") )
    },
  },
}
</script>

<style>

</style>
