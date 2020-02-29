<template>
<div>
  <notification
    class="mb-3"
    color="info"
    v-if="$store.state.text"
    >
    {{ $store.state.text }}
  </notification>  
  <!-- <button v-on:click="del">隠す</button> -->
</div>
</template>

<script>
import notification from '~/components/material/notification'

  export default {
    components: {
      notification
    },
    methods: {
        del() {
          this.$store.dispatch('showFlashMessage', {text: null})
        }
    },
    mounted() {
      const self = this
      setTimeout( () => {
        self.$store.dispatch('showFlashMessage',{text: null})
      }, 3000);
    }
  }
</script>