<template>
  <div>
    <v-row justify="center" align="center" class="ma-0 w-100 top">
      <div class="text-center">
        <h1 class="mb-10">TILを記録しよう</h1>
        <!-- <p><span class="hatena">?</span>TILとは</p> -->

        <RedBtn to="/signup">
          すぐに始める
        </RedBtn>
      </div>
    </v-row>

    <OneColumnContainer>
      <div class="mb-lg">
        <h2 class="text-center">MarkDown形式で書ける</h2>

        <v-row justify="center">
          <v-img :src="image.POST_TIL_PAGE_IMAGE" class="page-img" width="100%" max-width="700px" />
        </v-row>
      </div>

      <div class="mb-lg">
        <h2 class="text-center">フォルダ構成で管理</h2>

        <v-row justify="center">
          <v-img :src="image.FOLEDER_TIL_PAGE_IMAGE" class="page-img" width="100%" max-width="700px" />
        </v-row>
      </div>

      <div class="mb-lg">
        <h2 class="text-center">他の人のTILも見れる</h2>

        <v-row justify="center">
          <v-img :src="image.VIEW_TIL_PAGE_IMAGE" class="page-img" width="100%" max-width="700px" />
        </v-row>
      </div>

      <div class="mb-lg">
        <v-row justify="center">
          <RedBtn to="/signup">
            すぐに始める
          </RedBtn>
        </v-row>
      </div>
    </OneColumnContainer>
  </div>
</template>

<script>
import POST_TIL_PAGE_IMAGE from '~/assets/images/post-TIL-page.png'
import FOLEDER_TIL_PAGE_IMAGE from '~/assets/images/folder-TIL-page.png'
import VIEW_TIL_PAGE_IMAGE from '~/assets/images/view-TIL-page.png'

export default {
  computed: {
    /**
     * @return {{ [x: string]: string }}
     */
    image() {
      return {
        POST_TIL_PAGE_IMAGE,
        FOLEDER_TIL_PAGE_IMAGE,
        VIEW_TIL_PAGE_IMAGE
      }
    }
  },
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2rem;
  color: #2B486A;
}

h2 {
  font-size: 1.7rem;
  color: #2B486A;
  @include mq(sm) {
    font-size: 2rem;
  }
}

.mb-lg {
  margin-bottom: 50px;

  @include mq(sm) {
    margin-bottom: 100px;
  }
}

.top {
  height: 300px;
  background-color: #f6e58d;
}

.page-img {
  box-shadow: 0 2px 5px rgba(0,0,0,0.26)
}

.hatena {
  display: inline-block;
  text-align: center;
  height: 20px;
  width: 20px;
  border: 1px solid black;
  border-radius: 50%;
}
</style>
