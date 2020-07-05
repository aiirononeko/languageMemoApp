<template>
  <!-- TODO: 画像のプレビューを追加したい -->
  <div class="d-flex align-center">
    <div class="mr-2">
      <avatar-icon :src="getPreviewSrc" :alt="`${name} - avatar`" />
    </div>

    <base-image-file-input
      :api-error="apiError"
      :submit-count="submitCount"
      @input="onInput"
    />
  </div>
</template>

<script>
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

    name: {
      type: String,
      required: true
    },

    /**
     * 古い画像のパス
     */
    oldSrc: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      newSrc: null
    }
  },

  computed: {
    /**
     * @returns {String}
     */
    getPreviewSrc() {
      return this.newSrc || this.oldSrc
    }
  },

  methods: {
    /**
     * @param { File } file
     */
    onInput(file) {
      if (!file) {
        this.newSrc = null
        return this.$emit('input', file)
      }

      this.fileToDataURL(file, () => {
        return this.$emit('input', this.newSrc)
      })
    },

    /**
     * @param { File } file
     * @param { Function } onload onloadで実行する関数
     */
    fileToDataURL (file, onload) {
      const fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = () => {
        this.newSrc = fr.result
        onload()
      }
    }
  }
}
</script>


