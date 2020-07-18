<template>
  <v-form v-model="valid" @submit.prevent="onSubmit" ref="form">
    <div class="mb-8">
      <p>プロフィール画像</p>

      <PreviewImageFileInput
        v-if="getImage"
        :api-error="avatarApiError"
        :submit-count="submitCount"
        :name="form.name || info.username"
        :new-src="form.avatar"
        :old-src="getImage"
        @input="setAvatarValue"
      />
    </div>

    <div class="mb-8">
      <p>名前</p>
      <NameTextField
        v-model="form.name"
        :api-error="nameApiError"
        :submit-count="submitCount"
      />
    </div>

    <div class="mb-8">
      <p>自己紹介</p>
      <ProfileTextarea
        v-model="form.profile"
        :api-error="profileApiError"
        :submit-count="submitCount"
      />
    </div>

    <div class="mb-8">
      <p>出身</p>
      <AddressTextField
        v-model="form.address"
        :api-error="addressApiError"
        :submit-count="submitCount"
      />
    </div>

    <div class="d-flex justify-center mt-5">
      <OrangeBtn type="submit" :disabled="!valid">保存する</OrangeBtn>
    </div>
  </v-form>
</template>

<script>
export default {
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

    getImage() {
      return this.info && this.info.image || undefined
    }
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
