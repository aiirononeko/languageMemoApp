<template>
    <v-form>
      <username-text-field />

      <v-btn width="30" height="30" fab outlined >→</v-btn>
    </v-form>
</template>

<script>
import UsernameTextField from '~/components/organisms/textFields/UsernameTextField'

export default {
  components: {
    UsernameTextField
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
