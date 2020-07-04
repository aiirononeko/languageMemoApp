<template>
  <div>
    <edit-post-template
      v-if="!success"
      v-model="content"
      :name.sync="name"
      :pub.sync="pub"
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
import Post from '~/types/Post'
const EditPostTemplate = () => import('~/components/templates/EditPostTemplate')
const EditPostSuccessTemplate = () => import('~/components/templates/EditPostSuccessTemplate')

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
    errors: null /** バリデーションエラ */,
    success: false,
    postInfo: null
  }),

  middleware: "authenticated",

  computed: {
    defaultStatus() {
      return DEFAULT_STATUS
    },

    folderID() {
      return this.$route.query.folderid
    },

    userID() {
      return this.$store.getters["authentication/id"]
    },

    username() {
      return this.$store.getters["authentication/username"]
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
      this.errors = null

      try {
        const { data } = await this.$axios.$post(`/api/v1/posts`, {
          name: this.name,
          content: this.content,
          public: this.pub,
          user_id: this.userID,
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
      title: "新規ファイル作成"
    }
  }
}
</script>
