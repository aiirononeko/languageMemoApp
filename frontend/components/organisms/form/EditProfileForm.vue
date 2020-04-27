<template>
  <v-form>
    <preview-image-file-input />

    <!-- TODO: ユーザー名や自己紹介もこんなふうに加える-->
    <!-- コンポーネント名をDBやAPIの名前と一致(近いもの)にしたいので、まだコンポーネントを作っていない -->

    <!-- snsに紐付ける -->
    <tie-sns-btn-group />
  </v-form>
</template>

<script>
import PreviewImageFileInput from '~/components/organisms/fileInputs/PreviewImageFileInput'
import TieSnsBtnGroup from '~/components/organisms/btnGroup/TieSnsBtnGroup'

export default {
  components: {
    PreviewImageFileInput,
    TieSnsBtnGroup
  }
}
</script>

<style>

</style>
