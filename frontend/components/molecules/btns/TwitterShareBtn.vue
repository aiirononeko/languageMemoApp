<template>
  <TwitterBtn
    :href="twitterLink"
    target="_target"
    rel="nofollow"
  >
    <slot />
  </TwitterBtn>
</template>

<script>
import { isString } from "@/utils/string"
const TWITTER_TWEET_URL = "https://twitter.com/intent/tweet"

export default {
  props: {
    hashtag: {
      type: [String, Array],
      default: undefined
    },

    text: {
      type: String,
      default: undefined
    }
  },

  computed: {
    twitterLink() {
      const map = new Map()
      this.text && map.set('text', this.text)
      this.hashtag && map.set('hashtags', this.getHashtagStr)
      const params = new URLSearchParams(map) // クエリパラメータの生成

      return `${TWITTER_TWEET_URL}?${params.toString()}`
    },

    /**
     * hashtagをURL用に文字列で取得する
     *
     * @return { String }
     */
    getHashtagStr() {
      return isString(this.hashtag) ? this.hashtag : this.hashtag.join(',')
    }
  }
}
</script>
