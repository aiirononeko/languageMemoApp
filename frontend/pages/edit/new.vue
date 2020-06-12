<template>
  <div>
    <edit-fileid-template
      v-model="content"
      :name.sync="name"
      :pub.sync="pub"
      :is-both="isBoth"
      :is-edit="isEdit"
      :is-view="isView"
      @post="post"
    />
  </div>
</template>

<script>
const EditFileidTemplate = () => import('~/components/templates/EditFileidTemplate')

const DEFAULT_STATUS = 'both'

export default {
  components: {
    EditFileidTemplate
  },

  data: () => ({
    content: "" /** markdown */,
    name: null /** ファイル名 */,
    pub: false /** 公開の有無 */,
    folderID: null
  }),

  middleware: "authenticated",

  computed: {
    defaultStatus() {
      return DEFAULT_STATUS
    },

    userID() {
      return this.$store.getters["authentication/id"]
    },

    isBoth() {
      const LABEL = 'both'
      const status = this.$route.query.status
      return status ? status === LABEL : this.defaultStatus === LABEL
    },

    isEdit() {
      const LABEL = 'edit'
      const status = this.$route.query.status
      return status ? status === LABEL : this.defaultStatus === LABEL
    },

    isView() {
      const LABEL = 'view'
      const status = this.$route.query.status
      return status ? status === LABEL : this.defaultStatus === LABEL
    }
  },

  methods: {
    async post(){
      try {
        const { data } = await this.$axios.$post(`/api/v1/posts`, {
          name: this.name,
          content: this.content,
          public: this.pub,
          user_id: this.userID,
          folder_id: null // TODO folder_idを設定できるようにする
        })

        await this.$router.push({ path: '/edit/success', query: {
          fileid: data.id
        }})
      } catch (e) {}
    }
  },

  head() {
    return {
      title: "新規ファイル作成"
    }
  }
}
</script>
