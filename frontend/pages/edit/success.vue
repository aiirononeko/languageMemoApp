<template>
  <div>
    <edit-fileid-success-template :fileid="fileID" />
  </div>
</template>

<script>
const EditFileidSuccessTemplate = () => import('~/components/templates/EditFileidSuccessTemplate')

export default {
  components: {
    EditFileidSuccessTemplate
  },

  middleware: "authenticated",

  computed: {
    fileID() {
      return this.$route.query.fileid
    }
  }
}
</script>

<style>

</style>
