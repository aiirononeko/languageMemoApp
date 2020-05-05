<template>
  <div>
    <s-both-template v-if="isBoth" v-model="markdown" :fileid="fileID" />

    <s-edit-template v-if="isEdit" v-model="markdown" :fileid="fileID" />

    <s-view-template v-if="isView" :md="markdown" :fileid="fileID" />
  </div>
</template>

<script>
const DemoMd = `# h1 Heading
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading

## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

## Lists

Unordered

+ Create a list by starting a line with '+', '-', or '*'
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as '1.'

Start numbering with offset:

57. foo
1. bar

## Link

[Poeta github](https://github.com/aiirononeko/languageMemoApp)
`
const SBothTemplate = () => import('~/components/templates/EditFileidSBothTemplate')
const SEditTemplate = () => import('~/components/templates/EditFileidSEditTemplate')
const SViewTemplate = () => import('~/components/templates/EditFileidSViewTemplate')

const DEFALUT_STATUS = 'both'

export default {
  components: {
    SBothTemplate,
    SEditTemplate,
    SViewTemplate
  },

  data: () => ({
    markdown: DemoMd // TODO: APIからの値を入れる
  }),

  middleware: "authenticated",

  computed: {
    defalutStatus() {
      return DEFALUT_STATUS
    },

    fileID() {
      return this.$route.params.fileID
    },

    isBoth() {
      const LABEL = 'both'
      const status = this.$route.query.status
      return status ? status === LABEL : this.defalutStatus === LABEL
    },

    isEdit() {
      const LABEL = 'edit'
      const status = this.$route.query.status
      return status ? status === LABEL : this.defalutStatus === LABEL
    },

    isView() {
      const LABEL = 'view'
      const status = this.$route.query.status
      return status ? status === LABEL : this.defalutStatus === LABEL
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
