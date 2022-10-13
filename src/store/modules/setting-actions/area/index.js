import {
  fetch,
  getById,
  add,
  modify,
  deleteArea,
  deleteMulti,
  getByFilter,
} from "@actions/area.action";
export default {
  getAreas({ commit }) {
    commit("Set_Main_Loading", true);
    fetch(({ data }) => {
      commit("Get_List", { list: "areas", data });
      commit("Set_Main_Loading", false);
    });
  },
  getAreasByFilter({ commit }, payload) {
    commit("Set_Main_Loading", true);
    getByFilter(payload, ({ data }) => {
      commit("Get_List", { list: "areas", data });
      commit("Set_Main_Loading", false);
    });
  },
  setArea({ commit }, payload) {
    commit("Set_Main_Loading", true);
    add(payload, ({ data }) => {
      commit("Set_List", { data, list: "areas" });
      commit("Set_Main_Loading", false);
    });
  },
  getAreaById({ commit }, payload) {
    commit("Set_Main_Loading", true);
    getById(payload.id, payload.callback);
  },
  updateAreaById({ commit }, payload) {
    commit("Set_Main_Loading", true);
    modify(payload, ({ data }) => {
      commit("Update_By_Id", { data, list: "areas" });
      commit("Set_Main_Loading", false);
    });
  },
  deleteArea({ commit }, payload) {
    commit("Set_Main_Loading", true);
    deleteArea(payload, () => {
      commit("Delete", { ids: [payload], list: "areas" });
      commit("Set_Main_Loading", false);
    });
  },
  deleteAreas({ commit }, payload) {
    commit("Set_Main_Loading", true);
    deleteMulti(payload, () => {
      commit("Delete", { ids: payload, list: "areas" });
      commit("Set_Main_Loading", false);
    });
  },
};
