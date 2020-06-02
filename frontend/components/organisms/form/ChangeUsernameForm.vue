<template>
    <v-form class="pos-relative">
      <username-text-field v-model="vUserName" />

      <!-- TODO: orange-btnを使う。そのため、orange-btnのpropsにfabを追加する -->
      <v-btn class="next-btn" @click="onSubmit"  width="30" height="30" fab outlined >→</v-btn>
    </v-form>
</template>

<script>
import UsernameTextField from '~/components/organisms/textFields/UsernameTextField'

export default {
  components: {
    UsernameTextField
  },

  props: {
    username: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      vUserName: this.username
    }
  },

  methods: {
    onSubmit() {
      this.$emit('submit', this.vUserName)
    }
  }
}
</script>

<style scoped>
.next-btn {
  color: white;
  background-color: #FDCB6E;
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
