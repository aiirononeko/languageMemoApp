<template>
    <v-btn depressed color="yellow lighten-3" class="btn" to="to">
        <slot/>
    </v-btn>
</template>

<script>
export default {
    props: {
        to: {
            type: String,
            default: "#"
        }
    }
}
</script>

<style lang="scss" scoped>
    .btn {
        color: #747474;
    }
</style>
