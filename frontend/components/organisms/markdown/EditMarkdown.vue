<template>
  <div>
    <v-toolbar dense>
        <div style="width: 6rem;">
          <v-select
            v-model="mdExclusive"
            :items="headingItems"
            dense
            hide-details
            label="見出し"
            single-line
            @change="onChange"
          />
        </div>

        <v-btn-toggle v-model="mdExclusive" dense group @change="onChange">
          <v-btn value="bold">
            <v-icon>mdi-format-bold</v-icon>
          </v-btn>

          <v-btn value="italic">
            <v-icon>mdi-format-italic</v-icon>
          </v-btn>

          <v-btn value="strike">
            <v-icon>mdi-format-strikethrough-variant</v-icon>
          </v-btn>

          <v-btn value="undeline">
            <v-icon>mdi-format-underline</v-icon>
          </v-btn>

          <v-btn value="link">
            <v-icon>mdi-link-variant</v-icon>
          </v-btn>

          <v-btn value="list">
            <v-icon>mdi-format-list-bulleted</v-icon>
          </v-btn>

          <v-btn value="order-list">
            <v-icon>mdi-format-list-numbered</v-icon>
          </v-btn>

          <v-btn value="code">
            <v-icon>mdi-code-tags</v-icon>
          </v-btn>

          <v-btn value="quotes">
            <v-icon>mdi-format-quote-open</v-icon>
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
import markdownService from '~/src/domain/services/markdownService'

const _mdService = new markdownService()

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

    headingItems() {
      return [
        { text: '見出し1', value: 'h1' },
        { text: '見出し2', value: 'h2' },
        { text: '見出し3', value: 'h3' },
        { text: '見出し4', value: 'h4' },
        { text: '見出し5', value: 'h5' },
        { text: '見出し6', value: 'h6' }
      ]
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
    /**
     * 特定の文字列をマークダウンに追加
     */
    onChange() {
      if (this.mdExclusive) {
        // 挿入したいテキストなどの情報を取得
        const mdModel = _mdService.getMarkdownModel(this.mdExclusive)
        const doc = this.codemirror.getDoc()
        const cursor = doc.getCursor() // カーソルの位置を取得

        // 改行する
        if (mdModel.getLineNum() > 0) {
          doc.replaceRange('\n', cursor)
        }

        doc.replaceRange(mdModel.insert, cursor) // 文字列の挿入
        this.codemirror.focus() // focusを当てる
        this.mdExclusive = undefined
      }
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
