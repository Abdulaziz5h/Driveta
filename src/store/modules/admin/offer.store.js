import { getAll, add, getById, removeRange } from "@actions/offer.action";
import { resetState } from "@core/util/global";

const initState = () => ({
  offers: [],
});
export default {
  state: initState(),
  mutations: {
    Reset_Offers(state) {
      resetState(state, initState);
    },
    Get_Offers(state, data) {
      state.offers = data;
    },
    Delete_Offer(state, payload) {
      payload.forEach((id) => {
        const index = state.offers.findIndex((l) => l.id == id);
        state.offers.splice(index, 1);
      });
    },
  },
  actions: {
    getOffers({ commit }) {
      commit("Set_Main_Loading", true);
      getAll(({ data }) => {
        commit("Get_Offers", data);
        commit("Set_Main_Loading", false);
      });
    },
    setOffer({ commit }, payload) {
      commit("Set_Main_Loading", true);
      add(payload, payload.callback);
    },
    getOfferById({ commit }, payload) {
      commit("Set_Main_Loading", true);
      getById(payload.id, payload.callback);
    },
    deleteOffers({ commit }, payload) {
      commit("Set_Main_Loading", true);
      removeRange(payload, () => {
        commit("Delete_Offer", payload);
        commit("Set_Main_Loading", false);
      });
    },
  },
};
