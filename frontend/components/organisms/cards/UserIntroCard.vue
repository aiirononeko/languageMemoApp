<template>
  <v-card class="text-center pt-4 py-2">
    <div>
      <div class="mb-4">
        <v-img src="https://picsum.photos/510/300?random" class="user-icon" />
      </div>

      <p v-if="getName" class="name mb-4">{{ getName }}</p>

      <p v-if="getProfile" class="text-center mb-4">{{ getProfile }}</p>

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
const UserSnsBtnGroup = () => import("~/components/organisms/btnGroup/UserSnsBtnGroup")

export default {
  components: {
    UserSnsBtnGroup,
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
  },
}
</script>

<style lang="scss" scoped>
.user-icon {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  margin: 0 auto;
}

.name {
  font-size: 1.5rem;
  font-weight: bold;
}

.profile {
  width: 80%;
}
</style>
