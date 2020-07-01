<template>
  <one-column-container>
    <h1 class="text-center mb-4">投稿完了しました</h1>

    <v-row class="mb-4" justify="center">
      <twitter-share-btn :text="shareText" :hashtag="hashtag">
        <span class="ml-2">Twitterに投稿する</span>
      </twitter-share-btn>
    </v-row>

    <v-row class="mb-4" justify="center">
      <orange-btn class="mr-2" :to="`/edit/${postUid}`">
        編集する
      </orange-btn>

      <orange-btn>
        投稿を見る
      </orange-btn>
    </v-row>
  </one-column-container>
</template>

<script>
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
    postUid: {
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
    }
  }
}
</script>

<style>

</style>
