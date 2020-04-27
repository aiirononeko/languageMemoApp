<template>
  <div>
    <setting-profile-template />
  </div>
</template>

<script>
import SettingProfileTemplate from '~/components/templates/SettingProfileTemplate'

export default {
  components: {
    SettingProfileTemplate
  },

  middleware: "authenticated"
}
</script>

<style lang="scss" scoped>

</style>
