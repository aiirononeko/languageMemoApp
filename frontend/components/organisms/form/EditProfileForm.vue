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
      <p>ユーザ名</p>
      <v-text-field v-model="userName" outlined dense />
    </div>

    <div class="mb-8"> 
      <p>自己紹介</p>
      <v-textarea v-model="selfIntroduction" outlined height="80" />
    </div>

    <div class="mb-8">
      <p>出身</p>
      <v-text-field v-model="from" outlined dense />
    </div>

    <tie-sns-link-field />

    <div class="d-flex justify-center mt-5">
      <orange-btn>保存する</orange-btn>
    </div>
  </v-form>
</template>

<script>
const PreviewImageFileInput = () => import('~/components/organisms/fileInputs/PreviewImageFileInput')
const TieSnsLinkField = () => import('~/components/organisms/textFields/TieSnsLinkField')
const OrangeBtn = () => import('~/components/atoms/btns/OrangeBtn')

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
      userName: undefined,
      selfIntroduction: undefined,
      from: undefined
  }),

  created() {
    // TODO(Ropital): フォームに初期値を入れる
    this.userName = this.info.attributes.name
    this.selfIntroduction = this.info.attributes.profile
    this.from = this.info.attributes.address
    console.log(this.info)
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
