<template>
  <div>
    <p>Twitterのマイページリンク</p>
    <v-text-field v-model="twitterLink" outlined dense />

    <p>Githubのマイページリンク</p>
    <v-text-field v-model="githubLink" outlined dense />
  </div>
</template>

<script>
export default {
    data: () => {
        return {
            twitterLink: undefined,
            githubLink: undefined
        }
    },

    created() {
        // TODO(Ropital): 初期値を入れる
    }
}
</script>

<style>

</style>