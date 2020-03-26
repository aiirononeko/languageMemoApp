<template>
  <div>
    <div class="title">
      <h2 class="main-title">ログイン</h2>
    </div>
    <v-card width="600px" class="mx-auto mt-5">
      <v-card-text>
        <v-form>
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
              v-on:click="login"
              class="info"
              large
              block
              >ログイン</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import { mapActions } from "vuex";

export default {
  data: () => ({
    showPassword: false,
    isNotValid: true,
    password: "",
    email: "",
    error: [],
    rules: {
      required: value => {
        return !!value || "入力してください";
      },
      min: value => {
        return value.length >= 8 || "８文字以上入力してください";
      }
    }
  }),
  methods: {
    ...mapActions({
      showFlashMessage: "showFlashMessage",
      async login(e) {
        try {
          await this.$store.dispatch("login", {
            email: this.email,
            password: this.password
          });
          Cookie.set("access-token", this.$store.state.access_token);
          Cookie.set("client", this.$store.state.client);
          Cookie.set("uid", this.$store.state.uid);
          this.showFlashMessage({ text: "投稿完了" });
          this.$router.push(`/user/${this.$store.state.id}`);
        } catch (e) {
          console.log(this.formError);
        }
      }
    })
  },
  watch: {
    email: function(e) {
      if (this.email && this.password && this.password.length >= 8) {
        this.isNotValid = false;
      } else {
        this.isNotValid = true;
      }
    },
    password: function(e) {
      if (this.email && this.password && this.password.length >= 8) {
        this.isNotValid = false;
      } else {
        this.isNotValid = true;
      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
