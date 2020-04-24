<template>
  <base-container>
    <v-row justify="center">
      <v-col cols="12">
        <slot />
      </v-col>
    </v-row>
  </base-container>
</template>

<script>
import BaseContainer from '~/components/molecules/containers/BaseContainer'

export default {
  components: {
    BaseContainer
  }
}
</script>

<style>

</style>
