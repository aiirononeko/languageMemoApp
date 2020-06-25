<template>
  <!-- マイページの２階層以下 -->
  <div>
    <username-index-template
      :user-info="userInfo"
      :folders-info="foldersInfo"
      :is-creating-new-folder="isCreatingNewFolder"
      :is-creating-new-file="isCreatingNewFile"
      :parent-params="parentParams"
      @create-file="onCreateFile"
      @create-folder="onCreateFolder"
      @trigger-creating-new-folder="triggerCreatingNewFolder"
      @trigger-creating-new-file="triggerCreatingNewFile"
    />
  </div>
</template>

<script>
import User from '~/types/User'
import { pathToArr, getDirname } from '~/utils/path'
const UsernameIndexTemplate = () => import('~/components/templates/UsernameIndexTemplate')

export default {
  components: {
    UsernameIndexTemplate
  },

  data: () => ({
    isCreatingNewFolder: false,
    isCreatingNewFile: false,
  }),

  computed: {
    params() {
      return this.$route.params
    },

    parentParams() {
      return this.params.pathMatch
    },

    id() {
      return this.$store.getters["authentication/id"]
    }
  },

  methods: {
    async onCreateFolder(newFolderName) {
      const folderInfo = {
        name: newFolderName,
        public: false,
        user_id: this.id,
        parent_id: this.foldersInfo.id
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/folders`, folderInfo)
        this.foldersInfo = data
        this.triggerCreatingNewFolder()
      } catch(e) {
        return this.$nuxt.error({
          statusCode: e.response.status
        })
      }
    },

    async onCreateFile(newFileName) {
      const postsInfo = {
        name: newFileName,
        content: newFileName,
        public: false,
        user_id: this.id,
        folder_id: null
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/posts`, postsInfo)

        this.userInfo.posts.push({
          created_at: data.attributes["created-at"],
          content: data.attributes.content,
          id: data.id,
          name: data.attributes.name,
          parent_id: null,
          public: data.attributes.public,
          updated_at: data.attributes["updated-at"],
          user_id: data.attributes["user-id"]
        })
        this.triggerCreatingNewFile()
      } catch(e) {
        console.error(e)
      }
    },

    async fetchData() {
      try {
        const { data } = await this.$axios.$get(`/api/v1/folders/${this.parentParams}`)
        this.foldersInfo = data
        this.triggerCreatingNewFolder()
      } catch (e) {
        console.error(e)
      }
    },

    triggerCreatingNewFolder() {
      this.isCreatingNewFolder = !this.isCreatingNewFolder
    },

    triggerCreatingNewFile() {
      this.isCreatingNewFile = !this.isCreatingNewFile
    }
  },

  async asyncData({ $axios, params, store, error }) {
    const folder_id = getDirname(params.pathMatch)
    const ancestor_folder_id = pathToArr(params.pathMatch)
    let userInfo, foldersInfo

    try {
      userInfo = await $axios.$get(`/api/v1/users/${params.username}`)

      foldersInfo = await $axios.$get(`/api/v1/folders/${folder_id}`)
    } catch (e) {
      if (e.response && e.response.status) {
        return error({
          statusCode: e.response.status
        })
      }

      return error({
        statusCode: 500
      })
    }

      console.log(ancestor_folder_id)
      console.log(foldersInfo.data.attributes["ancestor-folders"])
    for (const apiAncestorFolder of foldersInfo.data.attributes["ancestor-folders"]) {
      const str = ancestor_folder_id.pop()
      if (str !== String(apiAncestorFolder.id)) {
        return error({
          statusCode: 404
        })
      }
    }

    return { userInfo: new User(userInfo.data), foldersInfo: foldersInfo.data }
  },
}
</script>

<style lang="scss" scoped>

</style>
