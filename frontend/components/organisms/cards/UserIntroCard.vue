<template>
  <v-card class="text-center pt-4 py-2">
    <div>
      <v-row justify="center" class="mb-4">
        <div>
          <avatar-icon :src="getAvatar" />
        </div>
      </v-row>

      <p v-if="getName" class="name mb-4">{{ getName }}</p>

      <p v-if="getProfile" class="text-center mb-4 px-8 px-sm-12">{{ getProfile }}</p>

      <div class="my-3">
        <p v-if="getAddress">
          <span class="text-uppercase">FROM</span>: {{ getAddress }}
        </p>

        <user-sns-btn-group />
      </div>
    </div>
  </v-card>
</template>

<script>
import DEFAULT_SRC from '~/assets/images/default_avatar_icon1.png'
const AvatarIcon = () => import("~/components/atoms/icons/AvatarIcon")
const UserSnsBtnGroup = () => import("~/components/organisms/btnGroup/UserSnsBtnGroup")

export default {
  components: {
    AvatarIcon,
    UserSnsBtnGroup
  },

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
      return this.userInfo && this.userInfo.image || DEFAULT_SRC
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
