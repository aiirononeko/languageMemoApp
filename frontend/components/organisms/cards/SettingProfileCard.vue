<template>
  <v-card width="800" class="mx-auto pt-10 pl-6">
      <edit-profile-form />
  </v-card>
</template>

<script>
const EditProfileForm = () => import('~/components/organisms/form/EditProfileForm')

export default {
  components: {
    EditProfileForm
  }
}
</script>

<style>

</style>
