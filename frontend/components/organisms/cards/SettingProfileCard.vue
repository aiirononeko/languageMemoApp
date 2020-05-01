<template>
  <v-card>
    <edit-profile-form />
    <user-sns-btn-group />
  </v-card>
</template>

<script>
const EditProfileForm = () => import('~/components/organisms/form/EditProfileForm')
const UserSnsBtnGroup = () => import('~/components/organisms/btnGroup/UserSnsBtnGroup')

export default {
  components: {
    EditProfileForm,
    UserSnsBtnGroup
  }
}
</script>

<style>

</style>
