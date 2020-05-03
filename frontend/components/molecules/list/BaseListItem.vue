<template>
  <v-list-item :to="to" :nuxt="nuxt" @click="onClick" link>
    <v-list-item-action v-if="icon">
      <v-icon v-text="icon" />
    </v-list-item-action>

    <v-list-item-content>
      <v-list-item-title v-text="name" />
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  props:  {
    icon: {
      type: String,
      default: undefined
    },

    name: {
      type: String,
      default: undefined
    },

    to: {
      type: [String, Object],
      default: undefined
    }
  },

  computed: {
    nuxt() {
      return !!this.to
    }
  },

  methods: {
    onClick() {
      return this.$emit('click')
    }
  },
}
</script>

<style>

</style>
