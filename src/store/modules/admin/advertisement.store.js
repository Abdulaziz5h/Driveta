import api from "@api";
import { resetState } from "@core/util/global";

const initState = () => ({
  advertisements: [],
});

export default {
  state: initState(),
  mutations: {
    Reset_Advertisment(state) {
      resetState(state, initState);
    },
    Get_Advertisement(state, payload) {
      state.advertisements = payload;
    },
    Delete_Advertisement(state, payload) {
      payload.forEach((id) => {
        const index = state.advertisements.findIndex((l) => l.id == id);
        state.advertisements.splice(index, 1);
      });
    },
  },
  actions: {
    getAdvertisements({ commit }) {
      commit("Set_Main_Loading", true);
      api.get("Advertisement/Fetch", ({ data }) => {
        commit("Get_Advertisement", data);
        commit("Set_Main_Loading", false);
      });
    },
    setAdvertisement({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = new FormData();
      formData.append("dto.id", payload.dto.id);
      formData.append("dto.title", payload.dto.title);
      formData.append("dto.description", payload.dto.description);
      payload.dto.files.forEach((f) => {
        formData.append(`files`, f);
      });
      api.post("Advertisement/AddWithFiles", formData, () => {
        payload.callback();
        commit("Set_Main_Loading", false);
      });
    },
    getAdvertisementById({ commit }, payload) {
      commit("Set_Main_Loading", true);
      api.get("Advertisement/GetById?id=" + payload.id, ({ data }) => {
        payload.callback(data);
        commit("Set_Main_Loading", false);
      });
    },
    updateAdvertisementById({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = new FormData();
      formData.append("dto.id", payload.dto.id);
      formData.append("dto.title", payload.dto.title);
      formData.append("dto.description", payload.dto.description);
      payload.dto.files.forEach((f) => {
        formData.append(`files`, f);
      });
      payload.dto.documents.forEach((doc) => {
        formData.append(`documentIds`, doc.id);
      });
      api.post("Advertisement/ModifyWithFiles", formData, (data) => {
        payload.callback(data);
        commit("Set_Main_Loading", false);
      });
    },
    deleteAdvertisement({ commit }, payload) {
      commit("Set_Main_Loading", true);
      api.delete("Advertisement/Delete?id=" + payload.id, () => {
        payload.callback();
        commit("Set_Main_Loading", false);
      });
    },
    deleteAdvertisements({ commit }, payload) {
      commit("Set_Main_Loading", true);
      api.delete(
        "Advertisement/DeleteMulti",
        () => {
          commit("Delete_Advertisement", payload);
          commit("Set_Main_Loading", false);
        },
        {
          confirm: "سيتم حذف هذا العنصر هل انت متأكد",
          success: "تم بنجاح", error: "حدث خطأ غير متوقع يرحى المحاولة مجددا"
        },
        payload
      );
    },
  },
};
