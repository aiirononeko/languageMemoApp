<template>
<div>
  <notification
    class="mb-3"
    color="info"
    v-if="text"
    >
    {{ text }}
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
    props: {
      text: {
        type: String,
        default: ''
      }
    },
    methods: {
        del() {
          this.text = null
        }
    },
    mounted() {
      const self = this
      setTimeout( () => {
        this.text = null
      }, 3000);
    }
  }
</script>