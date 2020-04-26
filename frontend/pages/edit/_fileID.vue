<template>
  <div>
    <p>ファイル名：{{ fileID }}</p>

    <s-both-template v-if="isBoth" />

    <s-edit-template v-if="isEdit" />

    <s-view-template v-if="isView" />
  </div>
</template>

<script>
import SBothTemplate from '~/components/templates/EditFileidSBothTemplate'
import SEditTemplate from '~/components/templates/EditFileidSEditTemplate'
import SViewTemplate from '~/components/templates/EditFileidSViewTemplate'

const DEFALUT_STATUS = 'both'

export default {
  components: {
    SBothTemplate,
    SEditTemplate,
    SViewTemplate
  },

  middleware: "authenticated",

  computed: {
    fileID() {
      return this.$route.params.fileID
    },

    defalutStatus() {
      return DEFALUT_STATUS
    },

    isBoth() {
      const LABEL = 'both'
      const status = this.$route.query.status
      return status ? status === LABEL : this.defalutStatus === LABEL
    },

    isEdit() {
      const LABEL = 'edit'
      const status = this.$route.query.status
      return status ? status === LABEL : this.defalutStatus === LABEL
    },

    isView() {
      const LABEL = 'view'
      const status = this.$route.query.status
      return status ? status === LABEL : this.defalutStatus === LABEL
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
