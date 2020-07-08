<template>
  <one-column-container>
    <h1 class="text-center mb-4">投稿完了しました</h1>

    <v-row class="mb-4" justify="center">
      <twitter-share-btn :text="shareText" :hashtag="hashtag">
        <span class="ml-2">Twitterに投稿する</span>
      </twitter-share-btn>
    </v-row>

    <v-row class="mb-4" justify="center">
      <orange-btn class="mr-2" @click="toEdit">
        編集する
      </orange-btn>

      <orange-btn :to="getViewLink">
        投稿を見る
      </orange-btn>
    </v-row>
  </one-column-container>
</template>

<script>
import Post from '@/types/Post'
const TwitterShareBtn = () => import('~/components/molecules/btns/TwitterShareBtn')
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')
const OrangeBtn = () => import('~/components/atoms/btns/OrangeBtn')

export default {
  components: {
    TwitterShareBtn,
    OneColumnContainer,
    OrangeBtn
  },

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
