import {
  fetch,
  getById,
  add,
  modify,
  deleteModel,
  deleteMulti,
} from "@actions/model.action";
export default {
  getModels({ commit }) {
    commit("Set_Main_Loading", true);
    fetch(({ data }) => {
      commit("Get_List", { list: "models", data });
      commit("Set_Main_Loading", false);
    });
  },
  setModel({ commit }, payload) {
    commit("Set_Main_Loading", true);
    add(payload, ({ data }) => {
      commit("Set_List", { data, list: "models" });
      commit("Set_Main_Loading", false);
    });
  },
  getModelById({ commit }, payload) {
    commit("Set_Main_Loading", true);
    getById(payload.id, payload.callback);
  },
  updateModelById({ commit }, payload) {
    commit("Set_Main_Loading", true);
    modify(payload, ({ data }) => {
      commit("Update_By_Id", { data, list: "models" });
      commit("Set_Main_Loading", false);
    });
  },
  deleteModel({ commit }, payload) {
    commit("Set_Main_Loading", true);
    deleteModel(payload, () => {
      commit("Delete", { ids: [payload], list: "models" });
      commit("Set_Main_Loading", false);
    });
  },
  deleteModels({ commit }, payload) {
    commit("Set_Main_Loading", true);
    deleteMulti(payload, () => {
      commit("Delete", { ids: payload, list: "models" });
      commit("Set_Main_Loading", false);
    });
  },
};
