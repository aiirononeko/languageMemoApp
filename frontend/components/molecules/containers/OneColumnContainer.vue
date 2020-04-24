<template>
  <base-container>
    <v-row justify="center">
      <v-col>
        <slot />
      </v-col>
    </v-row>
  </base-container>
</template>

<script>
import BaseContainer from '~/components/organisms/containers/BaseContainer'

export default {
  components: {
    BaseContainer
  }
}
</script>

<style>

</style>
