<template>
  <div class="auth" ref="auth-container">
    <div class="aside-image p-3 align-items-center">
      <img src="/media/vector_4.svg" class="w-100" alt="vector">
    </div>
    <div class="auth-content">
      <nav class="navbar">
        <div>
          <b-button
            class="mr-1 title px-3"
            to="/login"
            size="sm"
            v-if="$route.name == 'signup'"
            variant="flat-secondary"
            >{{$t('auth.login.title')}}</b-button
          >
          <b-button
            class="title px-3"
            size="sm"
            to="/signup"
            v-if="$route.name == 'login'"
            variant="flat-secondary"
            >{{$t('auth.signup.title')}}</b-button
          >
        </div>
        <router-link to="/" custom>
          <a-logo-white class="d-lg-none"/>
          <a-logo-primary class="d-none d-lg-block"/>
        </router-link>
      </nav>
      <div class="auth-content-container">
        <transition
          :enter-active-class="'animate__animated animate__fadeInUp'"
          :leave-active-class="'animate__animated animate__fadeInUp'"
        >
          <div class="form px-3">
            <router-view :appName="appName" />
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { checkSize } from "@/libs/global-event.js";
import { onMobileMode, onDesktopMode } from "@/libs/listeners.js";
import { $_themeConfig } from "@themeConfig";
export default {
  setup() {
    const appName = $_themeConfig.app.appName
    return {
      appName
    }
  },
  mounted() {
    onMobileMode(() => {
      this.$refs["auth-container"]?.classList.add("mobile-screen");
    });
    onDesktopMode(() => {
      this.$refs["auth-container"]?.classList.remove("mobile-screen");
    });
    checkSize();
  },
  
};
</script>
