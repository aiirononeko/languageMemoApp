<template>
  <TwoColumnContainer
    :left-cols="12"
    :left-sm="8"
    :rightCols="12"
    :right-sm="4"
  >
    <template #left>
      <div class="mb-6">
        <h1 class="mb-4">{{ postInfo.name }}</h1>

        <OnlyViewMarkdown :value="postInfo.content" :post-uid="postInfo.uid" />
      </div>

      <v-row>
        <v-col cols="12" class="text-right">
          <BlueBtn v-if="canAction" :to="`/edit/${postInfo.uid}`">
            編集する
          </BlueBtn>
        </v-col>
      </v-row>
    </template>

    <template #right>
      <div class="mb-4">
        <UserIntroCard :userInfo="userInfo" />
      </div>

      <OtherPostList :userInfo="userInfo" :postList="userInfo.posts" />
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
