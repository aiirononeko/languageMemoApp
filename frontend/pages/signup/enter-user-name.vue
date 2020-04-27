<template>
  <div>
    <signin-enterusername-template />
  </div>
</template>

<script>
import SigninEnterusernameTemplate from '~/components/templates/SigninEnterusernameTemplate'

export default {
  components: {
    SigninEnterusernameTemplate
  },

  middleware: "authenticated"
}
</script>

<style lang="scss" scoped>

</style>
