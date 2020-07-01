<template>
  <div>
    <edit-fileid-success-template :post-uid="postUID" />
  </div>
</template>

<script>
// import {isValidFileID} from "~/utils/fileID"
const EditFileidSuccessTemplate = () => import('~/components/templates/EditFileidSuccessTemplate')

// 不正な fileID だったら、APIの送信に辿り着く前に弾く
const checkValidFileID = ({ query, redirect }) => {
  // 不正なfileID (数値以外) ではないことを確認
  // if (!query.fileid || !isValidFileID(query.fileid)) {
  //   return redirect('/edit/new') // 新規作成ページにリダイレクト
  // }
}

export default {
  components: {
    EditFileidSuccessTemplate
  },

  middleware: [
    "authenticated",
    checkValidFileID
  ],

  computed: {
    postUID() {
      return this.$route.query.postuid
    }
  },

  head() {
    return {
      title: "ファイルの投稿完了"
    }
  }
}
</script>

<style>

</style>
