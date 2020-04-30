<template>
    <v-btn depressed color="yellow lighten-3" class="btn" :to="to" @click="onClickBtn" :disabled="canClick">
        <slot/>
    </v-btn>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: "#"
        },

        canClick: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        onClickBtn() {
            this.$emit('onClick')
        }
    }
}
</script>

<style lang="scss" scoped>
    .btn {
        color: #747474;
    }
</style>
