<template>
  <div class="mavonEditor">
    <client-only>
      <mavon-editor font-size="16px" language="ja" :toolbars="markdownOption" v-model="md"/>
    </client-only>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: undefined
    },

    preview: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      markdownOption: {
        bold: true,
        italic: true,
        header: true,
        underline: true,
        strikethrough: true,
        mark: true,
        superscript: true,
        subscript: true,
        quote: true,
        ol: true,
        ul: true,
        link: true,
        imagelink: false /** 画像 */,
        code: true,
        table: true,
        fullscreen: true,
        readmodel: true,
        htmlcode: true,
        help: true,
        undo: true,
        redo: true,
        trash: true,
        save: true,
        navigation: true,
        alignleft: true,
        aligncenter: true,
        alignright: true,
        subfield: true,
        preview: true
      }
    }
  },

  computed: {
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
