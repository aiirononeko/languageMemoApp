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
                    v-model="nickname"
                    label="ニックネーム" />

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

                    <v-text-field
                    v-bind:rules="[rules.required, rules.min]"
                    v-model="passwordConfirmation"
                    v-bind:type="showPassword ? 'text' : 'password'"
                    v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    label="パスワード確認"
                    counter
                    @click:append="showPassword = !showPassword" />

                    <v-card-actions>
                         <v-btn v-on:click="login" class="info" large block>ログイン</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        showPassword: false,
        name: "",
        nickname: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        rules: {
          required: value => { return !!value || 'Required.'  },
          min: value => { return value.length >= 8 || 'Min 8 characters'} ,
        },
    }),
    methods: {
        async login() {
            try {
                await this.$auth.loginWith('local', {
                    data: {
                            email: this.email,
                            password: this.password
                    }
                })
            } catch (e) {
                window.console.log(e)
            }
        }
  }
};
</script>

<style scoped lang="scss">
    .title {
        margin-top: 30px;
        text-align: center;

        .main-title {
            margin-bottom: 20px;
        }

        .sub-title {
            margin-bottom: 5px;
        }
    }
    
</style>