<template>
    <v-form>
      <username-text-field />

      <!-- TODO: orange-btnを使う。そのため、orange-btnのpropsにfabを追加する -->
      <v-btn :value="userName" @click="onSubmit" @input="setUserName" width="30" height="30" fab outlined >→</v-btn>
    </v-form>
</template>

<script>
import UsernameTextField from '~/components/organisms/textFields/UsernameTextField'

export default {
  components: {
    UsernameTextField
  },

  data: () => ({
    userName: ""
  }),

  methods: {
    setUserName(newVal) {
      this.userName = newVal
    },

    onSubmit() {
      this.$emit('submit', this.userName)
    }
  }
}
</script>

<style scoped>
.v-btn {
  color: white;
  background-color: #FDCB6E;
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
