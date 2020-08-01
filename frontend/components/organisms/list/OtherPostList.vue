<template>
  <article v-if="postList.lenth > 0">
    <h2 class="main-heading mb-8 text-center">ほかの投稿を見る</h2>

    <v-card v-for="(post, key) in getPostList" :key="key" class="mb-4">
      <v-card-text>
        <span class="main-heading card-title-font">{{ post.name }}</span>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          :to="getLink(post)"
          text
          color="deep-purple accent-4"
        >
          投稿を見る
        </v-btn>
    </v-card-actions>
    </v-card>
  </article>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: undefined
    },

    postList: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    getLink() {
      return (post) => {
        let link = ""
        for (const ancestorFolder of post.ancestorFolders) {
          link += `/${ancestorFolder.id}`
        }

        link += `/${post.uid}`
        return `/${this.userInfo.username}${link}`
      }
    },

    getPostList() {
      if (!this.postList) {
        return undefined
      }

      return this.postList.filter((post) => this.getLink(post) !== this.$route.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-title-font {
  font-size: 1.1rem;
}
</style>
