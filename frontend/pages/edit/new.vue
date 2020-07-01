<template>
  <edit-fileid-template
    v-model="content"
    :name.sync="name"
    :pub.sync="pub"
    :is-both="isBoth"
    :is-edit="isEdit"
    :is-view="isView"
    @post="post"
  />
</template>

<script>
import Post from '~/types/Post'
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
          folder_id: this.folderID
        })

        const postInfo = new Post(data)

        await this.$router.push({ path: '/edit/success', query: {
          postuid: postInfo.uid
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
