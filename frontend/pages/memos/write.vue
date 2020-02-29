<template>
    <div class="main">
        <h1>メモする</h1>
    </div>
</template>

<script>
export default {
    middleware({ store, redirect }) {
        if(!store.state.isAuthenticated) {
            redirect('/user/login');
        }
    },
}
</script>