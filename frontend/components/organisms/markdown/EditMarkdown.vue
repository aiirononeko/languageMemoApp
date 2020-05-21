<template>
  <div class="mavonEditor">
    <client-only>
      <mavon-editor
        v-model="md"
        :default-open="defaultOpen"
        :subfield="subfield"
        :toolbars="markdownOption"
        font-size="16px"
        language="ja"
        @save="onSave"
      />
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

    isView: {
      type: Boolean,
      default: true
    },

    subfield: {
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
    defaultOpen() {
      if (this.subfield) {
        return 'preview'
      }

      return this.isView ? 'preview' : 'edit'
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
    onSave() {
      return this.$emit('save')
    }
  },
}
</script>
