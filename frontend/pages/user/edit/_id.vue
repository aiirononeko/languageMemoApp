<template>
  <div>
    <div class="title">
      <h2 class="main-title">ユーザ編集</h2>
      <p>{{ info }}</p>
    </div>

    <v-card width="600px" class="mx-auto mt-5">
      <v-card-text>
        <v-form>
          <v-text-field
            v-bind:rules="[rules.required]"
            v-model="name"
            label="名前"
          />

          <v-text-field v-model="address" label="都道府県" />

          <v-textarea v-model="profile" label="プロフィール文" />

          <v-card-actions>
            <v-btn
              :disabled="isNotValid"
              v-on:click="store"
              class="info"
              large
              block
              >保存</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import axios from "~/plugins/axios";

axios.interceptors.request.use(config => {
  console.log(config);
  config.headers.common["access-token"] = Cookie.get("access-token");
  config.headers.common["client"] = Cookie.get("client");
  config.headers.common["uid"] = Cookie.get("uid");
  return config;
});

export default {
  data: () => ({
    showPassword: false,
    isNotValid: true,
    name: "",
    address: "",
    profile: "",
    rules: {
      required: value => {
        return !!value || "入力してください.";
      },
      min: value => {
        return value.length >= 8 || "８文字以上入力してください";
      }
    }
  }),
  mounted() {
    // console.log(this.info.data.attributes.name)
    this.name = this.info.data.attributes.name;
    this.profile = this.info.data.attributes.profile;
    this.address = this.info.data.attributes.address;
  },
  methods: {
    store: function() {
      axios.put(process.env.baseUrl + `/api/v1/auth`, {
        name: this.name,
        profile: this.profile,
        address: this.address
      });
    }
  },
  watch: {
    name: function(e) {
      if (this.name) {
        this.isNotValid = false;
      } else {
        this.isNotValid = true;
      }
    }
  },
  asyncData({ $axios, params }) {
    return $axios
      .$get(process.env.baseUrl + `/api/v1/auth/edit`, {
        headers: {
          access_token: Cookie.get("access-token"),
          client: Cookie.get("client"),
          uid: Cookie.get("uid")
        }
      })
      .then(res => {
        return { info: res };
      });
  }
};
</script>
