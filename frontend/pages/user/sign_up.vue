<template>
  <div>
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
            label="名前"
          />

          <v-text-field
            v-bind:rules="[rules.required]"
            v-model="email"
            label="メール"
          />

          <v-text-field
            v-bind:rules="[rules.required, rules.min]"
            v-model="password"
            v-bind:type="showPassword ? 'text' : 'password'"
            v-bind:append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="パスワード"
            counter
            @click:append="showPassword = !showPassword"
          />

          <v-card-actions>
            <v-btn
              :disabled="isNotValid"
              v-on:click="signUp"
              class="info"
              large
              block
              >新規登録</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    showPassword: false,
    isNotValid: true,
    name: "",
    email: "",
    password: "",
    rules: {
      required: value => {
        return !!value || "入力してください.";
      },
      min: value => {
        return value.length >= 8 || "８文字以上入力してください";
      }
    }
  }),
  methods: {
    async signUp() {
      try {
        await this.$axios.post(`${this.$axios.defaults.baseURL}/api/v1/auth`, {
          name: this.name,
          email: this.email,
          password: this.password
        });
        this.$router.push(`/user/confirm`);
      } catch (error) {
        console.error(error);
      }
    },
    checkPassword() {
      return this.password.length >= 8 && this.password;
    }
  },
  watch: {
    email: function(e) {
      if (this.email && this.checkPassword() && this.name) {
        this.isNotValid = false;
      } else {
        this.isNotValid = true;
      }
    },
    password: function(e) {
      if (this.email && this.checkPassword() && this.name) {
        this.isNotValid = false;
      } else {
        this.isNotValid = true;
      }
    },
    name: function(e) {
      if (this.email && this.checkPassword() && this.name) {
        this.isNotValid = false;
      } else {
        this.isNotValid = true;
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
