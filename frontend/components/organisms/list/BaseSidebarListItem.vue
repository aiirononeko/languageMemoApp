<template>
  <div>
    <v-row v-if="btn" justify="center">
      <sidebar-action-btn :text="name" :to="to" @click="onClick" class="mt-4" />
    </v-row>

    <base-list-item v-else :icon="icon" :name="name" :to="to" @click="onClick" />
  </div>
</template>

<script>
const BaseListItem = () => import('~/components/molecules/list/BaseListItem')
const SidebarActionBtn = () => import('~/components/molecules/btns/SidebarActionBtn')

export default {
  components: {
    BaseListItem,
    SidebarActionBtn
  },

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
