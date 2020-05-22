<template>
  <v-card max-width="355px" class="d-flex flex-column align-center pt-4">
    <div>
      <v-img src="https://picsum.photos/510/300?random" class="user-icon" />
    </div>

    <p class="name">{{ getName }}</p>

    <p class="profile">{{ getProfile }}</p>

    <div>
      <p>FROM: {{ getAddress }}</p>

      <user-sns-btn-group />
    </div>
  </v-card>
</template>

<script>
import UserSnsBtnGroup from "~/components/organisms/btnGroup/UserSnsBtnGroup"

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
      return this.userInfo.attributes && this.userInfo.attributes.name
    },
    getProfile() {
      return this.userInfo.attributes && this.userInfo.attributes.profile
    },
    getAddress() {
      return this.userInfo.attributes && this.userInfo.attributes.address
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
}

.name {
  font-size: 28px;
  font-weight: bold;
}

.profile {
  width: 80%;
}
</style>
