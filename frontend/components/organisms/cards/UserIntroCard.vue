<template>
  <v-card class="text-center pt-4 py-2">
    <div>
      <v-row justify="center" class="mb-4">
        <AvatarIcon :src="getAvatar" :alt="`${getName} - avatar`" />
      </v-row>

      <p v-if="getName" class="name mb-4">
        <nuxt-link :to="`/${username}`" class="black--text text-decoration-none">{{ getName }}</nuxt-link>
      </p>

      <p v-if="getProfile" class="text-center mb-4 px-8 px-sm-12">{{ getProfile }}</p>

      <div class="my-3">
        <p v-if="getAddress">
          <span class="text-uppercase">FROM</span>: {{ getAddress }}
        </p>

        <v-btn v-if="canLookFolderPath" :to="`/${username}`" text color="primary">{{ getName }}のページを見る</v-btn>
        <UserSnsBtnGroup />
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    userInfo: {
      type: Object,
      default: undefined,
    },
  },

  computed: {
    getName() {
      if (!this.userInfo) {
        return undefined
      }

      return this.userInfo.name || this.userInfo.username
    },

    getProfile() {
      return this.userInfo && this.userInfo.profile
    },

    getAddress() {
      return this.userInfo && this.userInfo.address
    },

    getAvatar() {
      return this.userInfo && this.userInfo.image
    },

    username() {
      return this.userInfo && this.userInfo.username
    },

    canLookFolderPath() {
      return this.$route.name === 'username-all'
    }
  },
}
</script>

<style lang="scss" scoped>
.name {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
