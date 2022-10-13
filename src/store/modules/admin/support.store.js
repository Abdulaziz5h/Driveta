
import { getSupports } from "@actions/user.action";
const initState = () => ({
  supports: [],
});
export default {
  state: initState(),
  mutations: {
    Set_Supports(state, data) {
      state.supports = data;
    }
  },
  actions: {
    getSupports({ commit }) {
      commit('Set_Main_Loading', true)
      getSupports(({ data }) => {
        commit('Set_Supports', data)
        commit('Set_Main_Loading', false)
      })
    }
  }
}