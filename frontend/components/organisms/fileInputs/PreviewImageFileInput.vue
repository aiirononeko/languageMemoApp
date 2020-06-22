<template>
  <!-- TODO: 画像のプレビューを追加したい -->
  <div class="d-flex align-center">
    <div class="mr-2">
      <avatar-icon :src="getPreviewSrc" />
    </div>

    <base-image-file-input
      :api-error="apiError"
      :submit-count="submitCount"
      @input="setAvatarValue"
    />
  </div>
</template>

<script>
import DEFAULT_SRC from '~/assets/images/default_avatar_icon1.png'
const AvatarIcon = () => import("~/components/atoms/icons/AvatarIcon")
const BaseImageFileInput = () => import('~/components/organisms/fileInputs/BaseImageFileInput')

export default {
  components: {
    AvatarIcon,
    BaseImageFileInput
  },

  props: {
    apiError: {
      type: Array,
      default: undefined
    },

    submitCount: {
      type: Number,
      default: 0
    },

    /**
     * 新しい画像のパス
     */
    newSrc: {
      type: String,
      default: undefined
    },

    /**
     * 古い画像のパス
     */
    oldSrc: {
      type: String,
      default: undefined
    }
  },

  computed: {
    /**
     * @returns {String}
     */
    getPreviewSrc() {
      return this.newSrc || this.oldSrc || DEFAULT_SRC
    },
  },

  methods: {
    setAvatarValue(newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>


