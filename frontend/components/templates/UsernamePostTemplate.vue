<template>
  <two-column-container
    :left-cols="12"
    :left-sm="4"
    :rightCols="12"
    :right-sm="8"
    bottom-class="flex-column-reverse flex-sm-row"
  >
    <template #left>
      <user-intro-card :userInfo="userInfo" />
    </template>

    <template #right>
      <div class="mb-6">
        <h1 class="mb-4">{{ postInfo.name }}</h1>

        <only-view-markdown :value="postInfo.content" :post-uid="postInfo.uid" />
      </div>

      <v-row justify="end">
        <blue-btn v-if="canAction" :to="`/edit/${postInfo.uid}`">
          編集する
        </blue-btn>
      </v-row>
    </template>
  </two-column-container>
</template>

<script>
const BlueBtn = () => import('~/components/atoms/btns/BlueBtn')
const TwoColumnContainer = () => import('~/components/molecules/containers/TwoColumnContainer')
const OnlyViewMarkdown = () => import('~/components/organisms/markdown/OnlyViewMarkdown')
const UserIntroCard = () => import('~/components/organisms/cards/UserIntroCard')

export default {
  components: {
    BlueBtn,
    TwoColumnContainer,
    OnlyViewMarkdown,
    UserIntroCard
  },

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
