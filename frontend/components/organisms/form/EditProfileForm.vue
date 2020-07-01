<template>
  <v-form v-model="valid" @submit.prevent="onSubmit" ref="form">
    <div class="mb-8">
      <p>プロフィール画像</p>

      <preview-image-file-input
        :api-error="avatarApiError"
        :submit-count="submitCount"
        :name="form.name || info.username"
        :new-src="form.avatar"
        :old-src="info.image"
        @input="setAvatarValue"
      />
    </div>

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

    <div class="d-flex justify-center mt-5">
      <orange-btn type="submit" :disabled="!valid">保存する</orange-btn>
    </div>
  </v-form>
</template>

<script>
const AddressTextField = () => import('~/components/organisms/textFields/AddressTextField')
const ProfileTextarea = () => import('~/components/organisms/textarea/ProfileTextarea')
const NameTextField = () => import('~/components/organisms/textFields/NameTextField')
const PreviewImageFileInput = () => import('~/components/organisms/fileInputs/PreviewImageFileInput')
const OrangeBtn = () => import('~/components/atoms/btns/OrangeBtn')

export default {
  components: {
    AddressTextField,
    ProfileTextarea,
    NameTextField,
    PreviewImageFileInput,
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
    avatarApiError() {
      return this.errors && this.errors.avatar || undefined
    },

    addressApiError() {
      return this.errors && this.errors.address || undefined
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

      return this.$emit('save', this.form)
    },

    setAvatarValue(e) {
      if (!e) {
        this.form.avatar = null
        return
      }

      this.form.avatar = e
    },

    validate () {
      this.$refs.form.validate()
    }
  }
}
</script>
