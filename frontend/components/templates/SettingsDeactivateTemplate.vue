<template>
  <OneColumnContainer>
    <h1 class="main-heading mb-8 text-center">アカウント削除</h1>

    <v-row justify="center">
      <v-col cols="12" sm="10" md="8">
        <SettingDeactivateCard v-if="!success" @deactivate="onDeactivate" />

        <v-alert
          border="top"
          colored-border
          type="success"
          elevation="2"
          v-else
        >
          {{ message }}
        </v-alert>
      </v-col>
    </v-row>
  </OneColumnContainer>
</template>

<script>
export default {
  props: {
    success: {
      type: Boolean,
      default: false
    },

    message: {
      type: String,
      default: undefined
    }
  },

  methods: {
    onDeactivate() {
      return this.$emit('deactivate')
    }
  },
}
</script>
