<template>
  <div>
    <div v-if="!check" class="text-center">
      <p>削除された場合、データを戻すことができません</p>
      <p>再度ご利用いただくには、新規登録が必要となります</p>
    </div>

    <v-row justify="center">
      <template v-if="!check">
        <v-btn to="/settings" class="mr-4" large>
          戻る
        </v-btn>

        <red-btn @click="onFirstProceedClick" class="mr-4" large>
          削除
        </red-btn>
      </template>

      <template v-else>
        <v-form @submit.prevent="onSubmit">
          <red-btn  class="mr-4" type="submit" large>
            アカウント削除
          </red-btn>

          <v-btn @click="onSecondBackClick" class="mr-4" large>
            やめる
          </v-btn>
        </v-form>
      </template>
    </v-row>
  </div>
</template>

<script>
const RedBtn = () => import('~/components/atoms/btns/RedBtn')

export default {
  components: {
    RedBtn
  },

  data() {
    return {
      check: false
    }
  },

  methods: {
    onSubmit() {
      return this.$emit('submit')
    },

    onFirstProceedClick() {
      this.check = true
    },

    onSecondBackClick() {
      this.check = false
    }
  },
}
</script>

<style>

</style>
