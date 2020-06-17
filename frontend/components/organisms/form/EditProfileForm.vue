<template>
  <v-form v-model="valid" @submit.prevent="onSubmit" enctype="multipart/form-data" ref="form">
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
      <name-text-field
        v-model="form.name"
        :api-error="nameApiError"
        :submit-count="submitCount"
      />
    </div>

    <div class="mb-8">
      <p>自己紹介</p>
      <profile-textarea
        v-model="form.profile"
        :api-error="profileApiError"
        :submit-count="submitCount"
      />
    </div>

    <div class="mb-8">
      <p>出身</p>
      <address-text-field
        v-model="form.address"
        :api-error="addressApiError"
        :submit-count="submitCount"
      />
    </div>

    <tie-sns-link-field />

    <div class="d-flex justify-center mt-5">
      <orange-btn type="submit">保存する</orange-btn>
    </div>
  </v-form>
</template>

<script>
const AddressTextField = () => import('~/components/organisms/textFields/AddressTextField')
const ProfileTextarea = () => import('~/components/organisms/textarea/ProfileTextarea')
const NameTextField = () => import('~/components/organisms/textFields/NameTextField')
const PreviewImageFileInput = () => import('~/components/organisms/fileInputs/PreviewImageFileInput')
const TieSnsLinkField = () => import('~/components/organisms/textFields/TieSnsLinkField')
const OrangeBtn = () => import('~/components/atoms/btns/OrangeBtn')

export default {
  components: {
    AddressTextField,
    ProfileTextarea,
    NameTextField,
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
      },
      valid: false,
      submitCount: 0
    }
  },

  created() {
    this.form.address = this.info.address
    this.form.profile = this.info.profile
    this.form.name = this.info.name
  },

  computed: {
    addressApiError() {
      return this.errors && this.errors.address || undefined
    },

    /**
     * @returns {String}
     */
    getPreviewIcon() {
      return this.form.avatar || this.info.image || 'https://picsum.photos/510/300?random'
    },

    profileApiError() {
      return this.errors && this.errors.profile || undefined
    },

    nameApiError() {
      return this.errors && this.errors.name || undefined
    },
  },

  methods: {
    onSubmit() {
      this.submitCount++
      this.validate()

      this.$emit('save', this.form)
    },

    setAvatarValue(newVal) {
      this.form.avatar = newVal
    },

    validate () {
      this.$refs.form.validate()
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
