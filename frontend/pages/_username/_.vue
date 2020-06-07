<template>
  <div>
    <!-- <p>パラメータ：{{ params }}</p>
    <p>ディレクトリ: {{ getDirArr  }}</p>
    <p>拡張子：{{ getExt }}</p>
    <p>ファイル名：{{ getFilename }}</p>
    <p>ファイルであるか：{{ isFile }}</p>

    <username-file-template v-if="isDir" />
    <username-folder-template v-if="isFile" /> -->

    <username-index-template :userInfo="userInfo" :foldersInfo="foldersInfo" @submit="submit" @fetchData="fetchData" />
  </div>
</template>

<script>
// import UsernameFileTemplate from '~/components/templates/UsernameFileTemplate'
// import UsernameFolderTemplate from '~/components/templates/UsernameFolderTemplate'
// import { getDirArr, getExt, getFilename, isDir, isFile } from '~/utils/path'
import UsernameIndexTemplate from '~/components/templates/UsernameIndexTemplate'

export default {
  components: {
    // UsernameFileTemplate,
    // UsernameFolderTemplate
    UsernameIndexTemplate
  },

  computed: {
    username() {
      return this.$route.params.username
    },

    params() {
      return this.$route.params
    },

    parentParams() {
      return this.params.pathMatch
    }
  },

  methods: {
    async submit(newFolderName) {
      let folderInfo = {
        name: newFolderName,
        public: false,
        user_id: this.$store.getters["authentication/id"],
        parent_id: this.parentParams
      }
      try {
        await this.$axios.post(`/api/v1/folders`, folderInfo)
      } catch(e) {
        console.error(e)
      }
      this.fetchData()
    },

    async fetchData() {
      try {
        const { data } = await this.$axios.$get(`/api/v1/folders/${this.parentParams}`)
        this.foldersInfo = data
      } catch (e) {
        console.error(e)
      }
    }
  },

  async asyncData({ $axios, params, store }) {
    try {
      const { data } = await $axios.$get(`/api/v1/folders/${params.pathMatch}`)
      const userInfo = await store.getters["authentication/userInfo"]
      return { userInfo, foldersInfo: data }
    } catch (e) {
      console.error(e)
    }
  },

  // computed: {
    

    // getDirArr() {
    //   return getDirArr(this.params.pathMatch)
    // },

    // getExt() {
    //   return getExt(this.params.pathMatch)
    // },

    // getFilename() {
    //   return getFilename(this.params.pathMatch)
    // },

    // isDir() {
    //   return isDir(this.params.pathMatch)
    // },

    // isFile() {
    //   return isFile(this.params.pathMatch)
    // }
  // },
}
</script>

<style lang="scss" scoped>

</style>
