<template>
    <v-app>
        <div class="title">
            <h2 class="main-title">ユーザ登録</h2>
            <p class="sub-title">ぽえたのサービスをご利用いただくには、</p>
            <p class="sub-title">ユーザー登録(無料)をする必要があります。</p>
        </div>

        <v-card width="600px" class="mx-auto mt-5">
            <v-card-text>
                <v-form>
                    <v-text-field  
                    v-bind:rules="[rules.required]"
                    v-model="name"
                    label="名前" />

                    <v-text-field  
                    v-bind:rules="[rules.required]"
                    v-model="email"
                    label="メール" />

                    <v-text-field
                    v-bind:rules="[rules.required, rules.min]"
                    v-model="password"
                    v-bind:type="showPassword ? 'text' : 'password'"
                    v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    label="パスワード"
                    counter
                    @click:append="showPassword = !showPassword" />

                    <v-card-actions>
                         <v-btn v-on:click="signUp" class="info" large block>ログイン</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script>
import axios from 'axios'

export default {
    data: () => ({
        showPassword: false,
        name: "",
        email: "",
        password: "",
        rules: {
          required: value => { return !!value || 'Required.'  },
          min: value => { return value.length >= 8 || 'Min 8 characters'} ,
        },
    }),
    methods: {
        async signUp() {
            axios.post('http://localhost:3000/api/v1/auth', {
                name: this.name,
                email: this.email,
                password: this.password
            })
            this.$router.push(`/user/confirm`)
        }
  }
};
</script>

<style scoped lang="scss">

    
</style>