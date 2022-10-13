import api from "@api";

export default {
  state: {
  },
  mutations: {
  },
  actions: {
    blockUser({ commit }, payload) {
      commit("Set_Main_Loading", true);
      api.put('user/Block/' + payload.id, payload.callback)
    }
  },
};
