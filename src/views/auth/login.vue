<template>
  <div class="pb-5">
    <b-form @submit.prevent>
      <h5 class="title text-center pt-5">
        {{ $t("auth.login.welcome") }}
      </h5>
      <h3 class="title text-center pb-4">
        <p class="text-primary appName text-nowrap mt-2 mb-4">
          لوحة تحكم {{ appName }} 👋
        </p>
        <p class="title mb-0 lead">{{ $t("auth.login.nice-to") }} 🎉</p>
      </h3>
      <a-input-text
        :label="$t('auth.login.form.username.label')"
        :placeholder="$t('auth.login.form.username.placeholder')"
        v-model="userDto.username"
        name="username"
      ></a-input-text>
      <a-input-text
        :label="$t('auth.login.form.password.label')"
        :placeholder="$t('auth.login.form.password.placeholder')"
        type="password"
        v-model="userDto.password"
        name="password"
      ></a-input-text>
      <b-checkbox variant="primary" class="mb-3" v-model="userDto.rememberMe">{{
        $t("auth.login.form.rememberme.label")
      }}</b-checkbox>
      <b-alert variant="danger" :show="setWrong">{{
        $t("auth.login.form.alert")
      }}</b-alert>
      <b-button
        type="submit"
        variant="primary"
        size="sm"
        class="px-5"
        @click="login(userDto)"
        v-if="!loading"
      >
        {{ $t("auth.login.title") }}
      </b-button>
      <b-button v-else type="button" variant="primary" loading class="px-5">
        <b-spinner variant="light" small></b-spinner>
      </b-button>
    </b-form>
  </div>
</template>

<script>
import useJwt from "@core/util/auth/jwt/useJwt";
import { getHomeRouteForLoggedInUser } from "@core/util/auth";

export default {
  props: {
    appName: String,
  },
  data: () => ({
    setWrong: false,
    loading: false,
    userDto: {
      username: "",
      password: "",
      rememberMe: false,
    },
  }),
  methods: {
    login(userDto) {
      this.loading = true;
      useJwt
        .login({
          username: userDto.username,
          password: userDto.password,
          rememberMe: userDto.rememberMe,
        })
        .then(({ data }) => {
          useJwt.setUserData(JSON.stringify(data));
          useJwt.setToken(data.token);
          useJwt.setRefreshToken(data.refreshToken);
          this.$router.replace(getHomeRouteForLoggedInUser());
          this.loading = false;
        })
        .catch(() => {
          this.setWrong = true;
          this.loading = false;
        });
    },
  },
};
</script>
