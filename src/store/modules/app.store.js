import { $_themeConfig } from "@themeConfig";
import { isRtl } from "@/libs/i18n";

export default {
  state: {
    isMainLoading: false,
    domainHost: $_themeConfig.app.domainPath,
    progressEvent: null,
    placeholderImage: "/assets/images/placeholder.png",
    isRTL: isRtl(),
  },
  getters: {
    domainHost({ domainHost }) {
      return domainHost;
    },
    placeholderImage({ placeholderImage }) {
      return placeholderImage;
    },
  },
  mutations: {
    Set_Main_Loading(state, is) {
      setTimeout(
        () => {
          state.isMainLoading = is;
        },
        !is ? 1200 : 0
      );
    },
    Toggle_Lang(state) {
      state.isRTL = !state.isRTL;
    },
    set_Progress(state, payload) {
      state.progressEvent = payload;
    },
  },
  actions: {},
};
