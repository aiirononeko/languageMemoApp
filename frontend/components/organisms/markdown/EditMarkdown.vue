<template>
  <div>
    <v-toolbar dense>
        <v-btn-toggle v-model="mdExclusive" dense group @change="onChange">
          <v-btn value="bold">
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn value="italic">
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>

          <v-btn value="undeline">
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>

          <v-btn>
            <v-icon>mdi-format-color-fill</v-icon>
          </v-btn>
        </v-btn-toggle>
    </v-toolbar>

    <client-only placeholder="Codemirror Loading...">
      <codemirror
        v-model="md"
        ref="cmEditor"
        :options="cmOptions"
        style="height: 100%"
      />
    </client-only>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/lib/codemirror.css' // import base style
import 'codemirror/theme/material.css'

// const insertText = (name) => {
//   if (name === 'bold') {
//     return '**'
//   }

//   if (name === 'italic') {
//     return ''
//   }

//   return ''
// }

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

  data: () => ({
    cmOptions: {
      tabSize: 4,
      mode: 'markdown',
      theme: 'material',
      lineNumbers: true,
      line: true,
    },
    mdExclusive: undefined
  }),

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
  },

  methods: {
    onChange() {
      const insertText = '**'
      const doc = this.codemirror.getDoc()
      const cursor = doc.getCursor()
      doc.replaceRange(insertText, cursor)
      this.codemirror.focus()
    }
  },
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
