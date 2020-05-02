<template>
    <v-btn depressed color="blue accent-4" class="btn" :to="to">
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
        color: white;
    }
</style>