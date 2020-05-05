<template>
  <v-card width="800" class="mx-auto pt-10 pl-6">
      <edit-profile-form :info="info"/>
  </v-card>
</template>

<script>
const EditProfileForm = () => import('~/components/organisms/form/EditProfileForm')

export default {
  props: {
    info: {
      type: Object,
      default: undefined
    }
  },

  components: {
    EditProfileForm
  }
}
</script>

<style>

</style>
