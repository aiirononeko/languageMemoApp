<script>
export default {
  props: {
    element: {
      type: String,
      default: 'h1'
    },

    text: {
      type: String,
      default: 'Application'
    }
  },

  render(createElement) {
    return createElement(this.element, { class: 'site-title text-capitalize' }, this.text)
  }
}
</script>

<style lang="scss" scoped>
.site-title {
  font-size: 1.75rem;
  font-weight: 500;
  margin-bottom: 0; // pの打ち消し
}
</style>
