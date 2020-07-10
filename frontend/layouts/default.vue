<template>
  <v-app id="inspire">
    <the-header />

    <the-sidebar />

    <v-card class="overflow-hidden header box-shadow-none">
      <v-sheet
        id="scrolling-techniques-7"
        class="overflow-y-auto"
        max-height="100vh"
      >
        <v-content>
          <nuxt />
        </v-content>
      </v-sheet>
    </v-card>
  </v-app>
</template>
