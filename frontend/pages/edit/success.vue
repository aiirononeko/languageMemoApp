<template>
  <div>
    <edit-fileid-success-template />
  </div>
</template>

<script>
const EditFileidSuccessTemplate = () => import('~/components/templates/EditFileidSuccessTemplate')

export default {
  components: {
    EditFileidSuccessTemplate
  },

  computed: {
    fileID() {
      return this.$route.query.fileid
    }
  },
}
</script>

<style>

</style>
