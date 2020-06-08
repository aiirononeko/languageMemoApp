<template>
  <div>
    <edit-fileid-template
      v-model="content"
      :name.sync="name"
      :pub.sync="pub"
      :fileid="fileID"
      :is-both="isBoth"
      :is-edit="isEdit"
      :is-view="isView"
      @post="post"
    />
  </div>
</template>

<script>
const EditFileidTemplate = () => import('~/components/templates/EditFileidTemplate')

// 不正な fileID だったら、APIの送信に辿り着く前に弾く
const checkCurrentFileID = ({ params, redirect }) => {
  // 不正なfileID (数値以外) 出ないことを確認
  if (!Number.isInteger(Number(params.fileID))) {
    return redirect('/edit/new') // 新規作成ページにリダイレクト
  }
}

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

  middleware: [
    "authenticated",
    checkCurrentFileID
  ],

  computed: {
    defaultStatus() {
      return DEFAULT_STATUS
    },

    fileID() {
      return this.$route.params.fileID
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

  async asyncData({ $axios, redirect, params }) {
    try {
      const { data } = await $axios.$get(`/api/v1/posts/${params.fileID}`)
      return { data }
    } catch (e) {
      return redirect('/edit/new') // ファイルがなかったら、新規作成ページにリダイレクト
    }
  },

  created() {
    if (this.data && this.data.attributes) {
      this.content = this.data.attributes.content
      this.name = this.data.attributes.name
      this.pub = this.data.attributes.public
      this.folderID = this.data.attributes.folderID
    }
  },

  methods: {
    async post(){
      const { data } = await this.$axios.$put(`/api/v1/posts/${this.fileID}`, {
        name: this.name,
        content: this.content,
        public: this.pub
      })

      this.$router.push({ path: '/edit/success', query: {
        fileid: this.fileID
      }})
    }
  },
}
</script>
