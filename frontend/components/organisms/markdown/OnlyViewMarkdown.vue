<template>
  <div class="mavonEditor">
    <client-only>
      <mavon-editor
        :value="value"
        :default-open="defaultOpen"
        :subfield="false"
        :toolbars="markdownOption"
        font-size="16px"
        language="ja"
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
  },

  data() {
    return {
      markdownOption: {
        navigation: true,
        readmodel: true,
      }
    }
  },

  computed: {
    defaultOpen: () => 'preview'
  }
}
</script>
