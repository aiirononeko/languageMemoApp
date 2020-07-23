<template>
  <div v-if="proverb" class="max-width-600 mb-4 mx-auto">
    <p class="font-marck-script text-proverb text-center" v-if="getContent">{{ getContent }}</p>

    <p class="font-marck-script text-right" v-if="getSpeaker">{{ getSpeaker }}</p>

    <p class="text-right text-small letter-narrow mt-8" v-if="getExplanation">{{ getExplanation }}</p>

  </div>
</template>

<script>
import Proverb from "@/utils/Proverb"

export default {
  data() {
    return {
      proverb: null
    }
  },

  async mounted() {
    const proverb = new Proverb()
    await proverb.setRandom()
    this.proverb = proverb
  },

  computed: {
    getContent() {
      return this.proverb && this.proverb.content
    },

    getExplanation() {
      return this.proverb && this.proverb.explanation
    },

    getSpeaker() {
      return this.proverb && this.proverb.speaker
    }
  },
}
</script>

<style>

</style>
