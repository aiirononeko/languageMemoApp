<template>
<div>
  <notification
    class="mb-3"
    color="info"
    v-if="!hidden"
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
    data: () => ({
      hidden: false
    }),
    methods: {
        //TODO: ボタンを押したらフラッシュを消すようにする
        del() {
          this.hidden = true
        }
    },
    mounted() {
      const self = this
      setTimeout( () => {
        this.hidden = true
      }, 3000);
    }
  }
</script>