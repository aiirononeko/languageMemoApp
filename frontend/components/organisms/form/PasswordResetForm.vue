<template>
  <v-form @submit="onSubmit">
    <email-text-field v-model="email" />

    <div class="d-flex justify-end">
      <blue-btn>
        送信
      </blue-btn>
    </div>
  </v-form>
</template>

<script>
const BlueBtn = () => import('~/components/atoms/btns/BlueBtn')
const EmailTextField = () => import('~/components/organisms/textFields/EmailTextField')

export default {
  components: {
    BlueBtn,
    EmailTextField
  },

  data() {
    return {
      email: null
    }
  },

  methods: {
    onSubmit() {
      return this.$emit('submit', this.email)
    }
  }
}
</script>

<style scoped>

</style>
