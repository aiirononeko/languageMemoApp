<template>
  <two-column-container :leftCols="6" :rightCols="6" >
    <template #left>
      <edit-markdown />
    </template>

    <template #right>
      <view-file-card />

      <blue-btn />
    </template>
  </two-column-container>
</template>

<script>
import BlueBtn from '~/components/atoms/btns/BlueBtn'
import EditMarkdown from '~/components/organisms/markdown/EditMarkdown'
import TwoColumnContainer from '~/components/molecules/containers/TwoColumnContainer'
import ViewFileCard from '~/components/organisms/cards/ViewFileCard'

export default {
  components: {
    BlueBtn,
    EditMarkdown,
    TwoColumnContainer,
    ViewFileCard
  }
}
</script>

<style>

</style>
