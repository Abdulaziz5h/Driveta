import {
  getAllDashboard,
  details,
  create,
  update,
} from "@actions/account.action";
import { formDataFromObj } from "@core/util/global";
import { resetState } from "@core/util/global";

const initState = () => ({
  accounts: [],
});

export default {
  state: initState(),
  mutations: {
    Reset_Managers(state) {
      resetState(state, initState);
    },
    Get_All_ACcounts(state, payload) {
      state.accounts = payload;
    },
  },
  actions: {
    getAllACcounts({ commit }) {
      commit("Set_Main_Loading", true);
      return getAllDashboard(({ data }) => {
        commit("Get_All_ACcounts", data);
        commit("Set_Main_Loading", false);
      });
    },
    managerDetails({ commit }, payload) {
      commit("Set_Main_Loading", true);
      details(payload.id, payload.callback);
    },
    addManager({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "personalImageFile",
        "personalImage",
        "dateBlocked",
      ]);
      formData.append("personalImageFile", payload.dto.personalImageFile[0]);

      create(formData, payload.callback);
    },
    updateManager({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "personalImageFile",
        "personalImage",
        "dateBlocked",
      ]);
      if (payload.dto.personalImageFile[0])
        formData.append("personalImageFile", payload.dto.personalImageFile[0]);
      if (payload.dto.personalImage[0]) {
        formData.append("personalImage.id", payload.dto.personalImage[0].id);
        formData.append("personalImage.src", payload.dto.personalImage[0].src);
        formData.append(
          "personalImage.name",
          payload.dto.personalImage[0].name
        );
        formData.append(
          "personalImage.length",
          payload.dto.personalImage[0].length
        );
        formData.append(
          "personalImage.type",
          payload.dto.personalImage[0].type
        );
      }

      if (payload.dto.dateBlocked)
        formData.append("dateBlocked", payload.dto.dateBlocked);
      update(formData, payload.callback);
    },
  },
};
