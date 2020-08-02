<template>
  <div>
    <EditPostTemplate
      v-if="!success"
      v-model="content"
      :name.sync="name"
      :pub.sync="pub"
      :is-both="isBoth"
      :is-edit="isEdit"
      :is-view="isView"
      @post="post"
    />

    <EditPostSuccessTemplate
      v-else
      :post-info="postInfo"
      :username="username"
      @to-edit="success = !success"
    />
  </div>
</template>

<script>
import Post from '@/types/Post'
import { isBothStatus, isEditStatus, isViewStatus } from '@/src/pages/edit/Status'

export default {
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
    folderID() {
      return this.$route.query.folderid
    },

    /**
     * @typedef {import('@/src/pages/edit/Status').Status} Status
     * @return { Status }
     */
    getStatus() {
      return this.$route.query.status
    },

    userID() {
      return this.$store.getters["authentication/id"]
    },

    username() {
      return this.$store.getters["authentication/username"]
    },

    isBoth() {
      return isBothStatus(this.getStatus)
    },

    isEdit() {
      return isEditStatus(this.getStatus)
    },

    isView() {
      return isViewStatus(this.getStatus)
    },
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
