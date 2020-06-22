<template>
  <!-- TODO: 画像のプレビューを追加したい -->
  <div class="d-flex align-center">
    <div class="mr-2">
      <v-img :src="getPreviewSrc" class="user-icon" />
    </div>

    <base-image-file-input
      :api-error="apiError"
      :submit-count="submitCount"
      @input="setAvatarValue"
    />
  </div>
</template>

<script>
const BaseImageFileInput = () => import('~/components/organisms/fileInputs/BaseImageFileInput')
const DEFAULT_SRC = 'https://picsum.photos/510/300?random'

export default {
  components: {
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

<style lang="scss" scoped>
.user-icon {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid #333;
}
</style>
