<template>
  <settings-index-template />
</template>

<script>
const SettingsIndexTemplate = () => import('~/components/templates/SettingsIndexTemplate')

export default {
  components: {
    SettingsIndexTemplate
  },

  middleware: "authenticated"
}
</script>
