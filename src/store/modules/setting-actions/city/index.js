import {
  fetch,
  getById,
  add,
  modify,
  deleteCity,
  deleteMulti,
  getByFilter
} from "@actions/city.action";
export default {
  getCities({ commit }) {
    commit("Set_Main_Loading", true);
    fetch(({ data }) => {
      commit("Get_List", { list: "cities", data });
      commit("Set_Main_Loading", false);
    });
  },
  setCity({ commit }, payload) {
    commit("Set_Main_Loading", true);
    add(payload, ({ data }) => {
      commit("Set_List", { data, list: "cities" });
      commit("Set_Main_Loading", false);
    });
  },
  getCitiesByFilter({ commit }, payload) {
    commit("Set_Main_Loading", true);
    getByFilter(payload, ({ data }) => {
      commit("Get_List", { list: "cities", data });
      commit("Set_Main_Loading", false);
    });
  },
  getCityById({ commit }, payload) {
    commit("Set_Main_Loading", true);
    getById(payload.id, payload.callback);
  },
  updateCityById({ commit }, payload) {
    commit("Set_Main_Loading", true);
    modify(payload, ({ data }) => {
      commit("Update_By_Id", { data, list: "cities" });
      commit("Set_Main_Loading", false);
    });
  },
  deleteCity({ commit }, payload) {
    commit("Set_Main_Loading", true);
    deleteCity(payload, () => {
      commit("Delete", { ids: [payload], list: "cities" });
      commit("Set_Main_Loading", false);
    });
  },
  deleteCities({ commit }, payload) {
    commit("Set_Main_Loading", true);
    deleteMulti(payload, () => {
      commit("Delete", { ids: payload, list: "cities" });
      commit("Set_Main_Loading", false);
    });
  },
};
