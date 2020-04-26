<template>
    <v-btn depressed color="red lighten-2" class="btn">
        <slot/>
    </v-btn>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
    .btn {
        color: white;
    }
</style>