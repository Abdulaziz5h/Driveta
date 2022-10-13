import {
  fetch,
  getById,
  add,
  modify,
  deleteStreet,
  deleteMulti,
  getByFilter
} from "@actions/street.action";
export default {
  getStreets({ commit }) {
    commit("Set_Main_Loading", true);
    fetch(({ data }) => {
      commit("Get_List", { list: "streets", data });
      commit("Set_Main_Loading", false);
    });
  },
  getStreetByFilter({ commit }, payload) {
    commit("Set_Main_Loading", true);
    getByFilter(payload, ({ data }) => {
      commit("Get_List", { list: "streets", data });
      commit("Set_Main_Loading", false);
    });
  },
  setStreet({ commit }, payload) {
    commit("Set_Main_Loading", true);
    add(payload, ({ data }) => {
      commit("Set_List", { data, list: "streets" });
      commit("Set_Main_Loading", false);
    });
  },
  getStreetById({ commit }, payload) {
    commit("Set_Main_Loading", true);
    getById(payload.id, payload.callback);
  },
  updateStreetById({ commit }, payload) {
    commit("Set_Main_Loading", true);
    modify(payload, ({ data }) => {
      commit("Update_By_Id", { data, list: "streets" });
      commit("Set_Main_Loading", false);
    });
  },
  deleteStreet({ commit }, payload) {
    commit("Set_Main_Loading", true);
    deleteStreet(payload, () => {
      commit("Delete", { ids: [payload], list: "streets" });
      commit("Set_Main_Loading", false);
    });
  },
  deleteStreets({ commit }, payload) {
    commit("Set_Main_Loading", true);
    deleteMulti(payload, () => {
      commit("Delete", { ids: payload, list: "streets" });
      commit("Set_Main_Loading", false);
    });
  },
};
