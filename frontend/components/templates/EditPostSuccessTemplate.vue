<template>
  <OneColumnContainer>
    <h1 class="text-center main-heading mb-4">投稿完了しました</h1>

    <v-row class="mb-4" justify="center">
      <TwitterShareBtn :text="shareText" :hashtag="hashtag">
        <span class="ml-2">Twitterに投稿する</span>
      </TwitterShareBtn>
    </v-row>

    <v-row class="mb-12" justify="center">
      <OrangeBtn class="mr-2" @click="toEdit">
        編集する
      </OrangeBtn>

      <OrangeBtn :to="getViewLink">
        投稿を見る
      </OrangeBtn>
    </v-row>

    <div class="max-width-600 mb-4 mx-auto">
      <p class="font-marck-script text-proverb text-center">Given enough eyeballs, all bugs are shallow.</p>

      <p class="text-right text-small">大勢の目があれば、すべてのバグは大した問題ではない</p>
    </div>
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
      return "til,poeta,駆け出しエンジニアと繋がりたい"
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
