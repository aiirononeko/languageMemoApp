<template>
  <client-only placeholder="Codemirror Loading...">
    <codemirror
      ref="cmEditor"
      v-model="md"
      :options="cmOptions"
      style="height: 100%"
    />
  </client-only>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/lib/codemirror.css' // import base style
import 'codemirror/theme/material.css'

export default {
  components: {
    codemirror
  },

  props: {
    value: {
      type: String,
      default: undefined
    }
  },

  data() {
    return {
      cmOptions: {
        tabSize: 4,
        mode: 'markdown',
        theme: 'material',
        lineNumbers: true,
        line: true,
      }
    }
  },

  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror
    },

    md: {
      /**
       * @returns { String }
       */
      get() {
        return this.value
      },
      /**
       * @param { String } newVal
       */
      set(newVal) {
        return this.$emit('input', newVal)
      }
    }
  }
}
</script>

<style lang="scss">
/**
 * あえて、globalで定義した
 * ただ、assets内に書くと距離が遠くなるので、ここに書く
 */
.CodeMirror {
  height: 100% !important;
}
</style>
