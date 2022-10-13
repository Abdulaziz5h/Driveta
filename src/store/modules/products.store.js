import {
  getAll,
  getById,
  add,
  modify,
  remove,
  removeRange,
} from "@actions/product.action";
import { formDataFromObj } from "@core/util/global";
import { resetState } from "@core/util/global";

const initState = () => ({
  products: [],
});
export default {
  state: initState(),
  mutations: {
    Reset_Products(state) {
      resetState(state, initState);
    },
    Get_All_Products(state, data) {
      state.products = data;
    },
    Remove_Products(state, ids) {
      ids.forEach((id) => {
        const index = state.products.findIndex(p => p.id == id);
        state.products.splice(index, 1)
      })
    }
  },
  actions: {
    getAllProducts({ commit }, storeId) {
      commit("Set_Main_Loading", true);
      getAll(storeId, ({ data }) => {
        commit("Get_All_Products", data);
        commit("Set_Main_Loading", false);
      });
    },
    getProductById({ commit }, payload) {
      commit("Set_Main_Loading", true);
      getById(payload.id, payload.callback);
    },
    createProduct({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "files",
        "documentIds",
        "documents",
        "categories",
      ]);
      payload.dto.files.forEach((file) => {
        formData.append("files", file);
      });
      add(formData, payload.callback);
    },
    updateProduct({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "files",
        "documentIds",
        "documents",
        "categories",
        "logs",
      ]);
      payload.dto.files.forEach((file) => {
        formData.append("files", file);
      });
      payload.dto.documents.forEach((doc) => {
        formData.append("documentIds", doc.id);
      });
      modify(formData, payload.callback);
    },
    removeProduct({ commit }, payload) {
      commit("Set_Main_Loading", true);
      remove(payload.id, () => {
        payload.callback();
        commit("Set_Main_Loading", false);
      });
    },
    removeMultiProduct({ commit }, ids) {
      commit("Set_Main_Loading", true);
      removeRange(ids, () => {
        commit("Remove_Products", ids);
        commit("Set_Main_Loading", false);
      });
    },
  },
};
