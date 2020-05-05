<template>
  <v-form>
    <div class="mb-8">
      <p>プロフィール画像</p>
      <div class="d-flex align-center">
        <img src="https://picsum.photos/510/300?random" class="mr-2" />
        <preview-image-file-input />
      </div>
    </div>
    <!-- TODO: ユーザー名や自己紹介もこんなふうに加える-->
    <!-- コンポーネント名をDBやAPIの名前と一致(近いもの)にしたいので、まだコンポーネントを作っていない -->

    <!-- TODO(Ropital): 各divをコンポーネントに切り出す -->
    <div class="mb-8">
      <p>名前</p>
      <v-text-field v-model="user.name" outlined dense />
    </div>

    <div class="mb-8"> 
      <p>自己紹介</p>
      <v-textarea v-model="user.profile" outlined height="80" />
    </div>

    <div class="mb-8">
      <p>出身</p>
      <v-text-field v-model="user.address" outlined dense />
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

class UserInfo {
  constructor() {
      this.name = null
      this.profile = null
      this.address = null
  }

  infoToUserInfo(info) {
    this.name = info && info.attributes && info.attributes.name
    this.profile = info && info.attributes && info.attributes.profile
    this.address = info && info.attributes && info.attributes.address
  }
}

export default {
  props: {
    info: {
      type: Object,
      default: undefined
    }
  },

  components: {
    PreviewImageFileInput,
    TieSnsLinkField,
    OrangeBtn
  },

  data: () => ({
      user: new UserInfo
  }),

  created() {
    this.user.infoToUserInfo(this.info)
  },

  methods: {
    onClick() {
      this.$emit('save', this.user)
    }
  }
}
</script>

<style>
.v-form {
  width: 80%;
  text-align: left;
}

img {
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
