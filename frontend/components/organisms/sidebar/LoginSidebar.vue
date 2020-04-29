<template>
  <v-list>
    <component v-for="(data, key) in datas" :is="getComponentName(data)" :key="key" :data="data" />
  </v-list>
</template>

<script>
import { getDatas, importComponents, getComponentName } from '~/utils/sidebar'
const NAME = 'login'

export default {
  components: importComponents(NAME),

  computed: {
    datas: () => getDatas(NAME),

    getComponentName() {
      return (data) => getComponentName(data)
    }
  },
}
</script>

<style>

</style>
