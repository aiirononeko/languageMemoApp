<template>
  <v-card class="pa-4">
    <h2 class="mb-3 text-center">{{ username }}</h2>

    <v-list>
      <v-list-item to="/settings/profile">
        <v-list-item-icon>
          <v-icon>mdi-account-edit</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>プロフィール編集</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/settings/user-name">
        <v-list-item-icon>
          <v-icon>mdi-cog</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>ユーザーIDの変更</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/settings/deactivate">
        <v-list-item-icon>
          <v-icon>mdi-account-remove</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>アカウント削除</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-6" />

      <v-list-item :to="mypage">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>マイページへ戻る</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  computed: {
    mypage() {
      return `/${this.username}`
    },

    username() {
      return this.$store.getters['authentication/username']
    }
  }
}
</script>
