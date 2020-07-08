<template>
  <div>
    <edit-post-template
      v-if="!success"
      v-model="content"
      :name.sync="name"
      :pub.sync="pub"
      :post-uid="postUID"
      :is-both="isBoth"
      :is-edit="isEdit"
      :is-view="isView"
      @post="post"
    />

    <edit-post-success-template
      v-else
      :post-info="postInfo"
      :username="username"
      @to-edit="success = !success"
    />
  </div>
</template>

<script>
import Post from '@/types/Post'
const EditPostTemplate = () => import('~/components/templates/EditPostTemplate')
const EditPostSuccessTemplate = () => import('~/components/templates/EditPostSuccessTemplate')

// 不正な PostUID だったら、APIの送信に辿り着く前に弾く
const checkValidPostUID = ({ params, redirect }) => {
  if (!Post.isValidPostUID(params.postUID)) {
    return redirect('/edit/new') // 新規作成ページにリダイレクト
  }
}

const DEFAULT_STATUS = 'both'

export default {
  components: {
    EditPostTemplate,
    EditPostSuccessTemplate
  },

  data: () => ({
    content: "" /** markdown */,
    name: null /** ファイル名 */,
    pub: false /** 公開の有無 */,
    errors: null /** バリデーションエラー */,
    success: false,
    postInfo: null
  }),

  middleware: [
    "authenticated",
    checkValidPostUID
  ],

  computed: {
    defaultStatus: () => DEFAULT_STATUS,

    postUID() {
      return this.$route.params.postUID
    },

    folderID() {
      return this.$route.query.folderid || this.postInfo.folderID
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
    },

    username() {
      return this.$store.getters["authentication/username"]
    }
  },

  async asyncData({ $axios, redirect, params }) {
    try {
      const { data } = await $axios.$get(`/api/v1/posts/${params.postUID}`)
      return { postInfo: new Post(data) }
    } catch (e) {
      return redirect('/edit/new') // ファイルがなかったら、新規作成ページにリダイレクト
    }
  },

  created() {
    this.content = this.postInfo.content
    this.name = this.postInfo.name
    this.pub = this.postInfo.public
  },

  methods: {
    async post(){
      this.errors = null

      try {
        const { data } = await this.$axios.$put(`/api/v1/posts/${this.postInfo.id}`, {
          name: this.name,
          content: this.content,
          public: this.pub,
          folder_id: this.folderID
        })

        this.postInfo = new Post(data)
        this.success = true
      } catch (e) {
        const statusCode = e.response && e.response.status || 500

        if (statusCode === 422) {
          this.errors = e.response.data.errors
          return
        }

        return this.$nuxt.error({
          statusCode
        })
      }
    }
  },

  head() {
    return {
      title: `ファイル編集 (${this.name})`
    }
  }
}
</script>
