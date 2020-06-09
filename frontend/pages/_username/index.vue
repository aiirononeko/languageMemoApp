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
import UsernameIndexTemplate from '~/components/templates/UsernameIndexTemplate'

export default {
  components: {
    UsernameIndexTemplate
  },

  data: () => ({
    isCreatingNewFolder: false
  }),

  computed: {
    username() {
      return this.$route.params.username
    },

    id() {
      return this.$store.getters["authentication/id"]
    },

    userInfo() {
      return this.$store.getters["authentication/userInfo"]
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
        await this.$axios.post(`/api/v1/folders`, folderInfo)
        await this.$store.dispatch("authentication/fetchUser")
      } catch(e) {
        console.error(e)
      }
      this.triggerIsCreatingNewFolder()
    },

    triggerIsCreatingNewFolder() {
      this.isCreatingNewFolder = !this.isCreatingNewFolder
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
