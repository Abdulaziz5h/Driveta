import api from "@api";
import { formDataFromObj } from "@core/util/global";
import { resetState } from "@core/util/global";

const initState = () => ({
  owners: [],
  ownersSelect: [],
})

export default {
  state: initState(),
  mutations: {
    Reset_Owners(state) {
      resetState(state, initState);
    },
    Get_Owners(state, data) {
      state.owners = data;
    },
    Get_Owners_Select(state, data) {
      state.ownersSelect = data;
    },
    Owner_Delete(state, id) {
      const index = state.owners.findIndex(s => s.id == id)
      state.owners.splice(index, 1)
    }
  },
  actions: {
    GetOwners({ commit }) {
      commit("Set_Main_Loading", true);
      api.get("Owner/GetAll", ({ data }) => {
        commit("Get_Owners", data);
        commit("Set_Main_Loading", false);
      });
    },
    GetOwner({ commit }, payload) {
      commit("Set_Main_Loading", true);
      api.get("Owner/GetById?id=" + payload.id, payload.callback);
    },
    addOwner({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "personalImageFile",
        "personalImage",
        "dateBlocked",
      ]);
      formData.append("personalImageFile", payload.dto.personalImageFile[0]);

      api.post("Owner/Add", formData, payload.callback);
    },
    updateOwner({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "personalImageFile",
        "personalImage",
        "dateBlocked",
      ]);

      if (payload.dto.personalImageFile[0])
        formData.append("personalImageFile", payload.dto.personalImageFile[0]);
      if (payload.dto.personalImage[0])
        formData.append("personalImage", payload.dto.personalImage[0].src);

      if (payload.dto.dateBlocked)
        formData.append("dateBlocked", payload.dto.dateBlocked);

      api.post("Owner/Modify", formData, payload.callback);
    },
    getOwnersSelect({ commit }, callback = () => { }) {
      commit("Set_Main_Loading", true);
      api.get("Owner/GetSelect", ({ data }) => {
        commit("Get_Owners_Select", data);
        callback();
        commit("Set_Main_Loading", false);
      });
    },
    ownerDelete({ commit }, payload) {
      commit("Set_Main_Loading", true);
      api.delete('Owner/Remove?id=' + payload.id, () => {
        commit('Owner_Delete', payload.id)
        payload.callback()
        commit("Set_Main_Loading", false);
      })
    }
  },
};
