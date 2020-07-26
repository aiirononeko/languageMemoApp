<template>
  <div>
    <v-menu top offset-x transition="scroll-x-transition">
      <template #activator="{ on, attrs }">
        <v-card outlined v-bind="attrs" v-on="on">
          <v-list-item three-line @click="menu = !menu">
            <v-list-item-avatar :size="50">
              <AvatarIcon :src="image" :size="50" />
            </v-list-item-avatar>

            <v-list-item-content>
              <div class="mb-2 overline">MYPAGE</div>
              <v-list-item-title class="display-name mb-1">{{ displayName }}</v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-icon color="grey lighten-1">{{ menu ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-list-item-action>
          </v-list-item>
        </v-card>
      </template>

      <v-list dense>
        <v-list-item dense @click="logout">
          ログアウト
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menu: false
    }
  },

  computed: {
    displayName() {
      return this.userInfo.name || this.username
    },

    image() {
      return this.userInfo.image
    },

    username() {
      return this.$store.getters['authentication/username']
    },

    userInfo() {
      return this.$store.getters['authentication/userInfo']
    },
  },

  methods: {
    async logout() {
      try {
        await this.$store.dispatch("authentication/logout")

        this.$router.push(`/signin`)
      } catch (e) {
        const statusCode = e.response && e.response.status || 500

        return this.$nuxt.error({ statusCode })
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.display-name {
  width: 7rem;
}
</style>
