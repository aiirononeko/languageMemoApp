<template>
  <one-column-container class="pos-relative" fluid>
    <v-row>
      <v-col class="py-0" cols="12" sm="6" md="3">
        <post-name-text-field v-model="nameModel" rounded outlined />
      </v-col>
      <v-spacer />
      <v-col class="py-0" cols="12" sm="3" md="3">
        <v-switch v-model="pubModel" class="mt-0 mt-sm-2" color="primary" flat :label="`${pub ? '公開' : '非公開'}`" />
      </v-col>
    </v-row>

    <edit-markdown v-model="md" :post-uid="postUid" :isView="isView" :subfield="isBoth" @post="post" />

    <div :class="{ 'text-right': !$device.isDesktopOrTablet }">
      <blue-btn
        :class="{ 'post-btn' : $device.isDesktopOrTablet  }"
        :disabled="isDisabled"
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
const PostNameTextField = () => import('~/components/organisms/textFields/PostNameTextField')
const OneColumnContainer = () => import('~/components/molecules/containers/OneColumnContainer')

export default {
  components: {
    BlueBtn,
    EditMarkdown,
    PostNameTextField,
    OneColumnContainer
  },

  props: {
    postUid: {
      type: String,
      default: "new"
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

    name: {
      type: String,
      default: null
    },

    pub: {
      type: Boolean,
      default: false
    },

    value: {
      type: String,
      default: ""
    }
  },

  computed: {
    isDisabled() {
      return !this.value || !this.name
    },

    md: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit('input', newVal)
      }
    },

    nameModel: {
      get() {
        return this.name
      },
      set(newVal) {
        return this.$emit('update:name', newVal)
      }
    },

    pubModel: {
      get() {
        return this.pub
      },
      set(newVal) {
        return this.$emit('update:pub', newVal)
      }
    },
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
