<template>
  <TwoColumnContainer
    :left-cols="12"
    :left-sm="4"
    :rightCols="12"
    :right-sm="8"
    bottom-class="flex-column-reverse flex-sm-row"
  >
    <template #left>
      <UserIntroCard :userInfo="userInfo" />
    </template>

    <template #right>
      <div class="mb-6">
        <h1 class="mb-4">{{ postInfo.name }}</h1>

        <OnlyViewMarkdown :value="postInfo.content" :post-uid="postInfo.uid" />
      </div>

      <v-row justify="end">
        <BlueBtn v-if="canAction" :to="`/edit/${postInfo.uid}`">
          編集する
        </BlueBtn>
      </v-row>
    </template>
  </TwoColumnContainer>
</template>

<script>
export default {
  props: {
    canAction: {
      type: Boolean,
      default: false
    },

    userInfo: {
      type: Object,
      default: undefined
    },

    postInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>

</style>
