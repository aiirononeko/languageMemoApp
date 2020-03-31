<template>
  <v-alert
    v-bind="$attrs"
    :class="[`elevation-${elevation}`]"
    :value="value"
    color="info"
    class="v-alert--notification mb-3"
    v-if="!hidden"
>
  {{ text }}
    <slot />
  </v-alert>
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    elevation: {
      type: [Number, String],
      default: 6
    },
    value: {
      type: Boolean,
      default: true
    },
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

<style>
.v-alert--notification {
  border-radius: 4px !important;
  border-top: none !important;
}
</style>