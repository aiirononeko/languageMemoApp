<template>
  <div>
    <p>ユーザー名：{{ username }}</p>

    <username-index-template />
  </div>
</template>

<script>
import UsernameIndexTemplate from '~/components/templates/UsernameIndexTemplate'

export default {
  components: {
    UsernameIndexTemplate
  },

  computed: {
    username() {
      return this.$route.params.username
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
