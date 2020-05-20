<template>
  <one-column-container>
    <h1 class="text-center mb-4">投稿完了しました</h1>

    <v-row class="mb-4" justify="center">
      <twitter-btn>
        <span class="ml-2">Twitterに投稿する</span>
      </twitter-btn>
    </v-row>

    <v-row class="mb-4" justify="center">
      <orange-btn class="mr-2">
        編集する
      </orange-btn>

      <orange-btn>
        投稿を見る
      </orange-btn>
    </v-row>
  </one-column-container>
</template>

<script>
const TwitterBtn = () => import('~/components/molecules/btns/TwitterBtn')
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')
const OrangeBtn = () => import('~/components/atoms/btns/OrangeBtn')

export default {
  components: {
    TwitterBtn,
    OneColumnContainer,
    OrangeBtn
  }
}
</script>

<style>

</style>
