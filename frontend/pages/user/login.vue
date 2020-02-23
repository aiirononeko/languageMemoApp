<template>
    <v-app>
        <v-card width="600px" class="mx-auto mt-5">
            <v-card-text>
                <v-form>
                    <v-text-field  
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
        password: "",
        email: "",
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