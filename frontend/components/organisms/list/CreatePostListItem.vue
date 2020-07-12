<template>
  <v-list-item>
    <v-list-item-icon><v-icon>mdi-file</v-icon></v-list-item-icon>

    <v-list-item-content>
      <v-form @submit.prevent="onSubmit">
        <v-list-item-title>
          <PostNameTextField v-model="model" dense />
        </v-list-item-title>
      </v-form>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: undefined
    }
  },

  computed: {
    model: {
      get() {
        return this.value
      },
      set(newVal) {
        return this.$emit('input', newVal)
      }
    }
  },

  methods: {
    onSubmit() {
      return this.$emit('submit')
    }
  },
}
</script>

<style>

</style>
