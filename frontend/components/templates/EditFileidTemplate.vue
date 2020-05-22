<template>
  <one-column-container class="pos-relative" fluid>
    <edit-markdown v-model="md" :fileid="fileid" :isView="isView" :subfield="isBoth" @post="post" />

    <div :class="{ 'text-right': !$device.isDesktopOrTablet }">
      <blue-btn
        :class="{ 'post-btn' : $device.isDesktopOrTablet  }"
        large
        @click="post"
      >
        投稿する
      </blue-btn>
    </div>
  </one-column-container>
</template>

<script>
const BlueBtn = () => import('~/components/atoms/btns/BlueBtn')
const EditMarkdown = () => import('~/components/organisms/markdown/EditMarkdown')
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')

export default {
  components: {
    BlueBtn,
    EditMarkdown,
    OneColumnContainer
  },

  props: {
    fileid: {
      type: String,
      required: true
    },

    isBoth: {
      type: Boolean,
      default: false
    },

    isEdit: {
      type: Boolean,
      default: false
    },

    isView: {
      type: Boolean,
      default: false
    },

    value: {
      type: String,
      default: undefined
    }
  },

  computed: {
    md: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit('input', newVal)
      }
    }
  },

  methods: {
    post() {
      return this.$emit('post')
    }
  },
}
</script>

<style lang="scss" scoped>
.post-btn {
  position: fixed;

  bottom: 5vh;
  right: 5vw;
}
</style>
