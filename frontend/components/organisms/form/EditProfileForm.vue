<template>
  <v-form enctype="multipart/form-data">
    <div class="mb-8">
      <p>プロフィール画像</p>
      <div class="d-flex align-center">
        <div class="mr-2">
          <v-img :src="getPreviewIcon" class="user-icon" />
        </div>

        <preview-image-file-input @input="setAvatarValue" />
      </div>
    </div>
    <!-- TODO: ユーザー名や自己紹介もこんなふうに加える-->
    <!-- コンポーネント名をDBやAPIの名前と一致(近いもの)にしたいので、まだコンポーネントを作っていない -->

    <!-- TODO(Ropital): 各divをコンポーネントに切り出す -->
    <div class="mb-8">
      <p>名前</p>
      <v-text-field v-model="form.name" label="名前" outlined dense />
    </div>

    <div class="mb-8">
      <p>自己紹介</p>
      <v-textarea v-model="form.profile" label="自己紹介" outlined height="80" />
    </div>

    <div class="mb-8">
      <p>出身</p>
      <v-text-field v-model="form.address" label="出身" outlined dense />
    </div>

    <tie-sns-link-field />

    <div class="d-flex justify-center mt-5">
      <orange-btn @onClick="onClick">保存する</orange-btn>
    </div>
  </v-form>
</template>

<script>
const PreviewImageFileInput = () => import('~/components/organisms/fileInputs/PreviewImageFileInput')
const TieSnsLinkField = () => import('~/components/organisms/textFields/TieSnsLinkField')
const OrangeBtn = () => import('~/components/atoms/btns/OrangeBtn')

export default {
  components: {
    PreviewImageFileInput,
    TieSnsLinkField,
    OrangeBtn
  },

  props: {
    errors: {
      type: Object,
      default: undefined
    },

    info: {
      type: Object,
      default: undefined
    }
  },

  data() {
    return {
      form: {
        address: '',
        avatar: null,
        profile: '',
        name: '',
      }
    }
  },

  created() {
    this.form.address = this.info.address
    this.form.profile = this.info.profile
    this.form.name = this.info.name
  },

  computed: {
    /**
     * @returns {String}
     */
    getPreviewIcon() {
      return this.form.avatar || this.info.image || 'https://picsum.photos/510/300?random'
    }
  },

  methods: {
    onClick() {
      this.$emit('save', this.form)
    },

    setAvatarValue(newVal) {
      this.form.avatar = newVal
    }
  }
}
</script>

<style lang="scss" scoped>
.user-icon {
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
