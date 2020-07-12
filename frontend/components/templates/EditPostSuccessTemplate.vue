<template>
  <OneColumnContainer>
    <h1 class="text-center mb-4">投稿完了しました</h1>

    <v-row class="mb-4" justify="center">
      <TwitterShareBtn :text="shareText" :hashtag="hashtag">
        <span class="ml-2">Twitterに投稿する</span>
      </TwitterShareBtn>
    </v-row>

    <v-row class="mb-4" justify="center">
      <OrangeBtn class="mr-2" @click="toEdit">
        編集する
      </OrangeBtn>

      <OrangeBtn :to="getViewLink">
        投稿を見る
      </OrangeBtn>
    </v-row>
  </OneColumnContainer>
</template>

<script>
import Post from '@/types/Post'

export default {
  props: {
    postInfo: {
      type: Object,
      required: true
    },

    username: {
      type: String,
      required: true
    }
  },

  computed: {
    shareText() {
      return "poeta"
    },

    hashtag() {
      return "til,poeta,駆け出しエンジニアとつながりたい"
    },

    getViewLink() {
      return Post.generateViewLink(this.postInfo, this.username)
    }
  },

  methods: {
    toEdit() {
      return this.$emit('to-edit')
    }
  },
}
</script>

<style>

</style>
