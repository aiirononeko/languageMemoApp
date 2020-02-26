<template>
    <v-app>
        <div class="top">
            <h3 class="name">{{ data.data.attributes.name }}</h3>

        </div>
        <div class="cards">
            <div class="card">

            </div>
        </div>
        <!-- <h3>ユーザID： {{ $store.state.id }}</h3> -->
        <!-- <nuxt-link to="/">Home</nuxt-link> -->
    </v-app>
</template>

<script>
import axios from 'axios'

export default {
    asyncData({ $axios, params }) {
        return $axios.$get(`http://localhost:3000/api/v1/users/${params.id}`)
        .then((res) => {
            return {data: res}
        })
    }
}
</script>

<style scoped lang="scss">
    .top {
        background: #f9f9f9;
        height: 100px;
        position: relative;

        .name {
            position: absolute;
            left: 40px;
            top: 10px;
        }
    }
    
    .cards {
        margin: 20px auto;
        width: 80%;
        height: 600px;
        border: 1px solid #b2bec3;
    }
    

</style>