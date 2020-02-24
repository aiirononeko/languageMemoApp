<template>
    <section>
        <h1>マイページ</h1>
        <p>{{ data }}</p>
    </section>
</template>

<script>
import axios from 'axios'

export default {
    asyncData ({ app }) {
      return app.$axios.get(`http://localhost:3000/api/v1/users/3`)
      .then((res) => {
        return { data: res.data }
      })
    }
}
</script>