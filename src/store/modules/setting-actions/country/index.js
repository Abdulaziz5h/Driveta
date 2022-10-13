import {
  fetch,
  getById,
  add,
  modify,
  deleteCountry,
  deleteMulti,
} from "@actions/country.action";
export default {
  getCountries({ commit }) {
    commit("Set_Main_Loading", true);
    fetch(({ data }) => {
      commit("Get_List", { list: "countries", data });
      commit("Set_Main_Loading", false);
    });
  },
  setCountry({ commit }, payload) {
    commit("Set_Main_Loading", true);
    add(payload, ({ data }) => {
      commit("Set_List", { data, list: "countries" });
      commit("Set_Main_Loading", false);
    });
  },
  getCountryById({ commit }, payload) {
    commit("Set_Main_Loading", true);
    getById(payload.id, payload.callback);
  },
  updateCountryById({ commit }, payload) {
    commit("Set_Main_Loading", true);
    modify(payload, ({ data }) => {
      commit("Update_By_Id", { data, list: "countries" });
      commit("Set_Main_Loading", false);
    });
  },
  deleteCountry({ commit }, payload) {
    commit("Set_Main_Loading", true);
    deleteCountry(payload, () => {
      commit("Delete", { ids: [payload], list: "countries" });
      commit("Set_Main_Loading", false);
    });
  },
  deleteCountries({ commit }, payload) {
    commit("Set_Main_Loading", true);
    deleteMulti(payload, () => {
      commit("Delete", { ids: payload, list: "countries" });
      commit("Set_Main_Loading", false);
    });
  },
};
