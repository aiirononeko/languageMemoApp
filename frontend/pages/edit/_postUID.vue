<template>
  <div>
    <edit-fileid-template
      v-model="content"
      :name.sync="name"
      :pub.sync="pub"
      :post-uid="postUID"
      :is-both="isBoth"
      :is-edit="isEdit"
      :is-view="isView"
      @post="post"
    />
  </div>
</template>

<script>
// import {isValidFileID} from "~/utils/fileID"
import Post from '~/types/Post'
const EditFileidTemplate = () => import('~/components/templates/EditFileidTemplate')

// 不正な fileID だったら、APIの送信に辿り着く前に弾く
const checkValidFileID = ({ params, redirect }) => {
  // 不正な fileID (数値以外) ではないことを確認
  // if (!isValidFileID(params.fileID)) {
  //   return redirect('/edit/new') // 新規作成ページにリダイレクト
  // }
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
  }),

  middleware: [
    "authenticated",
    checkValidFileID
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
      const { data } = await this.$axios.$put(`/api/v1/posts/${this.postInfo.id}`, {
        name: this.name,
        content: this.content,
        public: this.pub,
        folder_id: this.folderID
      })

      await this.$router.push({ path: '/edit/success', query: {
        postuid: this.postUID
      }})
    }
  },

  head() {
    return {
      title: `ファイル編集 (${this.name})`
    }
  }
}
</script>
