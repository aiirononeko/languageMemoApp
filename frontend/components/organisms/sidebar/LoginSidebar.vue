<template>
  <v-list class="h-100 pos-relative">
    <v-list-item-group color="primary">
      <component v-for="(data, key) in datas" :is="getComponentName(data)" :key="key" :data="data" />
    </v-list-item-group>

    <SidebarUserCard class="card-position" />
  </v-list>
</template>

<script>
import SidebarService from '~/src/domain/services/sidebarService'
const NAME = 'login'

const Sidebar = new SidebarService(NAME)

export default {
  components: Sidebar.importComponents,

  computed: {
    datas: () => Sidebar.datas,

    getComponentName() {
      return (data) => Sidebar.componentName(data)
    }
  },
}
</script>

<style lang="scss" scoped>
.card-position {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
