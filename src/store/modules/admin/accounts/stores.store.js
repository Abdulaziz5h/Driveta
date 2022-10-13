import {
  getAll,
  getById,
  add,
  modify,
  getAllByFilter,
  remove,
} from "@actions/store.action";
import { formDataFromObj } from "@core/util/global";
import { resetState } from "@core/util/global";

const initState = () => ({
  stores: [],
  filteredStores: {
    activeStoresCount: 0,
    stores: [],
  },
});

export default {
  state: initState(),
  mutations: {
    Reset_Stores(state) {
      resetState(state, initState);
    },
    Get_Stores(state, data) {
      state.stores = data;
    },
    Get_Filtered_Stores(state, data) {
      Object.assign(state.filteredStores, data);
    },
    Store_Delete(state, id) {
      const index = state.stores.findIndex((s) => s.id == id);
      state.stores.splice(index, 1);
    },
  },
  actions: {
    getStores({ commit }) {
      commit("Set_Main_Loading", true);
      getAll(({ data }) => {
        commit("Get_Stores", data);
        commit("Set_Main_Loading", false);
      });
    },
    getStoresByFilter({ commit }, params) {
      commit("Set_Main_Loading", true);
      getAllByFilter(params, ({ data }) => {
        commit("Get_Filtered_Stores", data);
        commit("Set_Main_Loading", false);
      });
    },
    getStoreById({ commit }, payload) {
      commit("Set_Main_Loading", true);
      getById(payload.id, (res) => {
        payload.callback(res);
        commit("Set_Main_Loading", false);
      });
    },
    addStore({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "personalImageFile",
        "storeFiles",
        "dateBlocked",
      ]);
      formData.append("personalImageFile", payload.dto.personalImageFile[0]);
      payload.dto.storeFiles.forEach((file) => {
        formData.append(`storeFiles`, file);
      });
      add(formData, payload.callback);
    },
    updateStore({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "personalImageFile",
        "personalImage",
        "documents",
        "storeFiles",
        "dateBlocked",
      ]);
      if (payload.dto.personalImageFile[0])
        formData.append("personalImageFile", payload.dto.personalImageFile[0]);
      if (payload.dto.personalImage[0])
        formData.append("personalImage", payload.dto.personalImage[0].src);

      payload.dto.storeFiles.forEach((file) => {
        formData.append(`storeFiles`, file);
      });
      payload.dto.documents.forEach((file, i) => {
        formData.append(`documentIds[${i}]`, file.id);
      });
      if (payload.dto.dateBlocked)
        formData.append("dateBlocked", payload.dto.dateBlocked);
      modify(formData, payload.callback);
    },
    storeDelete({ commit }, payload) {
      commit("Set_Main_Loading", true);
      remove(payload.id, () => {
        commit("Store_Delete", payload.id);
        payload.callback();
        commit("Set_Main_Loading", false);
      });
    },
  },
};
