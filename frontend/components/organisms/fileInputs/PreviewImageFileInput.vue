<template>
  <!-- TODO: 画像のプレビューを追加したい -->
  <div class="d-flex align-center">
    <div class="mr-2">
      <avatar-icon :src="getPreviewSrc" :alt="`${name} - avatar`" />
    </div>

    <base-image-file-input
      :api-error="apiError"
      :submit-count="submitCount"
      @input="setAvatarValue"
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
    setAvatarValue(e) {
      if (!e) {
        this.newSrc = null
        return this.$emit('input', e)
      }

      const fr = new FileReader()
      fr.readAsDataURL(e)
      fr.onload = () => {
        this.newSrc = fr.result
        return this.$emit('input', this.newSrc)
      }
    }
  }
}
</script>


