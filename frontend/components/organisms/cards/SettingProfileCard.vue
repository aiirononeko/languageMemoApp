<template>
  <v-card class="pt-10 px-6 pb-8">
    <edit-profile-form :errors="errors" :info="info" @save="save" />
  </v-card>
</template>

<script>
const EditProfileForm = () => import('~/components/organisms/form/EditProfileForm')

export default {
  components: {
    EditProfileForm
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

  methods: {
    save(userInfo) {
      this.$emit('save', userInfo)
    }
  }
}
</script>

<style>

</style>
