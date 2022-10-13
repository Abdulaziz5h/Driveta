<template>
  <div :class="{ collapsed: collapsed }">
    <div class="d-flex">
      <a-drawer :items="items"></a-drawer>
      <main class="content border-left rounded-0">
        <a-navbar
          @toggleCollapse="collapsed = !collapsed"
          :collapsed="collapsed"
        ></a-navbar>
        <a-bradcrumb :items="$route.meta($route).breadcrumb">
          <router-view name="router-action" />
        </a-bradcrumb>
        <div
          class="content-container py-3 position-relative"
          :class="{ 'overflow-hidden': isMainLoading }"
        >
          <div class="alert alert-warning mx-3 text-capitalize" v-if="isUserLoggedIn() && !isAdmin() && !userData.isActive">
            فقدت بعض البيانات ، يرجى إكمال
            <router-link :to="'/admin/' + currentUserRole() + 's/' + currentUserId">بياناتك</router-link>
          </div>
          <transition name="scale-transition">
            <a-loading v-if="isMainLoading" />
          </transition>
          <transition name="scale-transition">
            <div v-show="!isMainLoading">
              <b-container fluid>
                <slot></slot>
              </b-container>
            </div>
          </transition>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { $_themeConfig } from "@themeConfig";
import navigationDrawer from "@/navigation/drawer/index.js";
import aNavbar from "./components/a-navbar/index.vue";
import aDrawer from "./components/a-drawer/drawer-list";
import aBradcrumb from "./components/a-bradcrumb";
import { mapState } from "vuex";
import { onMobileMode, onDesktopMode } from "@/libs/listeners.js";
import { checkSize } from "@/libs/global-event.js";
import { currentUserId, getUserData, isUserLoggedIn, currentUserRole, isAdmin } from "@core/util/auth";

export default {
  components: {
    aNavbar,
    aDrawer,
    aBradcrumb,
  },
  data: () => ({
    navigationDrawer,
    collapsed: false,
  }),
  computed: {
    ...mapState({
      isMainLoading: (state) => state.app.isMainLoading,
    }),
    currentUserId() {
      return currentUserId();
    },
    userData() {
      return getUserData();
    },
    appName() {
      return $_themeConfig.app.appName;
    },
    appSubtitle() {
      return $_themeConfig.app.appSubtitle;
    },
    items() {
      return navigationDrawer;
    },
  },
  mounted() {
    onMobileMode(() => {
      this.collapsed = true;
    });
    onDesktopMode(() => {
      this.collapsed = false;
    });
    checkSize();
  },
  methods: {
    isUserLoggedIn,
    currentUserRole,
    isAdmin
  }
};
</script>
