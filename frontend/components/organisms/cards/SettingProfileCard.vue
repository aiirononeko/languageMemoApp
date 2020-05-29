<template>
  <v-card width="100%" max-width="800" class="mx-auto pt-10 px-6 pb-8" >
      <edit-profile-form :info="info" @save="save" />
  </v-card>
</template>

<script>
import User from "@/types/User"
const EditProfileForm = () => import('~/components/organisms/form/EditProfileForm')

export default {
  components: {
    EditProfileForm
  },

  props: {
    info: {
      type: User,
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
