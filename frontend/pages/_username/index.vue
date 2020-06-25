<template>
  <!-- マイページのルート -->
  <div>
    <username-index-template
      :userInfo="userInfo"
      :isCreatingNewFolder="isCreatingNewFolder"
      @submit="submit"
      @triggerIsCreatingNewFolder="triggerIsCreatingNewFolder"
    />
  </div>
</template>

<script>
const UsernameIndexTemplate = () => import('~/components/templates/UsernameIndexTemplate')
import User from '~/types/User'

export default {
  components: {
    UsernameIndexTemplate
  },

  data: () => ({
    isCreatingNewFolder: false
  }),

  computed: {
    id() {
      return this.$store.getters["authentication/id"]
    },

    params() {
      return this.$route.params
    }
  },

  methods: {
    async submit(newFolderName) {
      const folderInfo = {
        name: newFolderName,
        public: false,
        user_id: this.id,
        parent_id: null
      }

      try {
        const { data } = await this.$axios.$post(`/api/v1/folders`, folderInfo)

        this.userInfo.folders.push({
          created_at: data.attributes["created-at"],
          id: data.id,
          name: data.attributes.name,
          parent_id: null,
          public: data.attributes.public,
          updated_at: data.attributes["updated-at"],
          user_id: data.attributes["user-id"]
        })
        this.triggerIsCreatingNewFolder()
      } catch(e) {
        console.error(e)
      }
    },

    async fetchData() {
      try {
        const { data } = await this.$axios.$get(`/api/v1/users/${this.params.username}`)
        this.userInfo = new User(data)
        this.triggerIsCreatingNewFolder()
      } catch (e) {
        console.error(e)
      }
    },

    triggerIsCreatingNewFolder() {
      this.isCreatingNewFolder = !this.isCreatingNewFolder
    },
  },

  async asyncData({ $axios, params, store, error }) {
    try {
      const { data } = await $axios.$get(`/api/v1/users/${params.username}`)
      return { userInfo: new User(data) }
    } catch (e) {
      error({
        statusCode: e.response.status
      })
    }
  },
}
</script>

<style lang="scss" scoped>

</style>
