<template>
  <v-alert
    v-bind="$attrs"
    :class="[`elevation-${elevation}`]"
    :color="color"
    :type="type"
    :value="isDisplay"
    class="v-alert--notification mb-3"
  >
    <slot />
  </v-alert>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'info'
    },

    elevation: {
      type: [Number, String],
      default: 6
    },

    /**
     * 強制的にhiddenにするときはtrue,
     * しないときはfalse
     */
    hiddenForce: {
      type: Boolean,
      default: false
    },

    time: {
      type: Number,
      default: 3000
    },

    type: {
      type: String,
      default: undefined
    }
  },

  inheritAttrs: false,

  data: () => ({
    hidden: false
  }),

  computed: {
    isDisplay() {
      return !this.hidden || this.hiddenForce
    }
  },

  methods: {
    //TODO: ボタンを押したらフラッシュを消すようにする
    del() {
      this.hidden = true
    }
  },

  mounted() {
    setTimeout( () => {
      this.del()
    }, this.time);
  }
}
</script>

<style lang="scss" scoped>
.v-alert--notification {
  border-radius: 4px !important;
  border-top: none !important;
}
</style>
