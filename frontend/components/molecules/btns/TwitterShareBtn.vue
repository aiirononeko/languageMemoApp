<template>
  <twitter-btn
    :href="twitterLink"
    :data-hashtags="hashtag"
    :data-text="text"
    target="_target"
    data-lang="ja"
    data-show-count="false"
  >
    <slot />
  </twitter-btn>
</template>

<script>
import { isString } from "@/utils/string"
const TwitterBtn = () => import('~/components/molecules/btns/TwitterBtn')
const TWITTER_TWEET_URL = "https://twitter.com/intent/tweet"

export default {
  components: {
    TwitterBtn
  },

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
      const params = new URLSearchParams(map)
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
