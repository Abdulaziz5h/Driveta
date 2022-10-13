import { block, active } from "@actions/user.action";
export default {
  actions: {
    block({ commit }, payload) {
      commit("Set_Main_Loading", true);
      block(payload.id, payload.callback);
    },
    active({ commit }, payload) {
      commit("Set_Main_Loading", true);
      active(payload.id, payload.callback);
    },
  },
};
