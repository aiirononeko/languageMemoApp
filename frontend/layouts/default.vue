<template>
  <v-app id="inspire" >
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>

        <nuxt-link to="/">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ホーム</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </nuxt-link>

        <nuxt-link to="/user/login">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account-arrow-right</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ログイン</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </nuxt-link>

        <nuxt-link to="/user/logout">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account-cancel-outline</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ログアウト</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </nuxt-link>

        <nuxt-link to="/user/sign_up">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account-plus</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>新規登録</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </nuxt-link>

        <nuxt-link to="/user/1">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-account-details</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>マイページ</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </nuxt-link>

        <nuxt-link to="#">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-book-open-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>メモ一覧</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </nuxt-link>

        <nuxt-link to="/memos/write">
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-border-color</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>メモする</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        </nuxt-link>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-aspect-ratio</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>コード実行</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

  <v-card class="overflow-hidden header">
    <v-app-bar
      absolute
      elevate-on-scroll
      app
      color="white"
      scroll-target="#scrolling-techniques-7"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-7"
      class="overflow-y-auto"
      max-height="100vh"
    >
    <v-content>
      <!-- <v-container
          class="main"
          fluid
          style="height: 120vh;"
      > -->
        <nuxt/>
      <!-- </v-container> -->
    </v-content>
      <!-- <v-footer
        color="indigo"
        app
      >
        <span class="white--text">&copy; San Bruno</span>
      </v-footer> -->
    </v-sheet>
  </v-card>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
  }
</script>

<style scoped>
  a {
    text-decoration: none;
  }

  .main {
    margin-top: 10px;
  }
</style>