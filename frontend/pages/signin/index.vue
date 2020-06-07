<template>
  <div>
    <signin-template />
  </div>
</template>

<script>
const SigninTemplate = () => import('~/components/templates/SigninTemplate')

export default {
  components: {
    SigninTemplate
  },

  middleware: 'guest'
}
</script>

<style lang="scss" scoped>

</style>
