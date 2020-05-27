<template>
  <div>
    <signin-template />
  </div>
</template>

<script>
import SigninTemplate from '~/components/templates/SigninTemplate'

export default {
  components: {
    SigninTemplate
  },

  middleware: 'guest'
}
</script>

<style lang="scss" scoped>

</style>
