<template>
  <v-form ref="form" v-model="valid" @submit.prevent="onSubmit">
    <UsernameTextField
      v-model="vUserName"
      :api-error="apiError"
      :submit-count="submitCount"
    />

    <div class="d-flex justify-end">
      <BlueBtn type="submit" :disabled="!valid">
        変更
      </BlueBtn>
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

    username: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      valid: false,
      vUserName: this.username,
      submitCount: 0
    }
  },

  computed: {
    apiError() {
      return this.errors && this.errors.username || undefined
    },
  },

  methods: {
    onSubmit() {
      this.submitCount++
      this.validate()

      return this.$emit('submit', this.vUserName)
    },

    validate () {
      this.$refs.form.validate()
    }
  },

}
</script>
