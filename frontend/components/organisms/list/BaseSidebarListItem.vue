<template>
  <div>
    <v-row v-if="btn" justify="center">
      <SidebarActionBtn :text="name" :to="to" @click="onClick" class="mt-4" />
    </v-row>

    <BaseListItem v-else :exact="exact" :icon="icon" :name="name" :to="to" @click="onClick" />
  </div>
</template>

<script>
export default {
  props:  {
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    btn() {
      return this.data.btn || false
    },

    exact() {
      return this.data.exact || false
    },

    icon() {
      return this.data.icon || undefined
    },

    name() {
      return this.data.name || undefined
    },

    to() {
      return this.data.to || undefined
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
