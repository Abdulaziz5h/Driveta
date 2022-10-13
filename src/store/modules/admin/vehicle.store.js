import api from "@api";
import { formDataFromObj, nullGuid } from "@core/util/global";
import { resetState } from "@core/util/global";

const initState = () => ({
  vehicles: [],
  availableVehicles: [],
});
export default {
  state: initState(),
  mutations: {
    Reset_Vehicle(state) {
      resetState(state, initState);
    },
    Get_Vehicles(state, data) {
      state.vehicles = data;
    },
    Available_Vehicles(state, data) {
      state.availableVehicles = data;
    },
    Delete_Vehicle(state, id) {
      const index = state.vehicles.findIndex((s) => s.id == id);
      state.vehicles.splice(index, 1);
    },
    Remove_Vehicle(state, vehicle) {
      const index = state.availableVehicles.findIndex(
        (s) => s.id == vehicle.id
      );
      state.availableVehicles.splice(index, 1);
    },
  },
  actions: {
    getVehicles({ commit }) {
      commit("Set_Main_Loading", true);
      api.get("Vehicle/GetAll", ({ data }) => {
        commit("Get_Vehicles", data);
        commit("Set_Main_Loading", false);
      });
    },
    getVehicle({ commit }, payload) {
      commit("Set_Main_Loading", true);
      api.get("Vehicle/GetById?id=" + payload.id, payload.callback);
    },
    getAvailable({ commit }, payload) {
      commit("Set_Main_Loading", true);
      api.get("Vehicle/GetAvailable" + (payload?.id && payload.id != nullGuid ? '?id=' + payload.id : ''), ({ data }) => {
        commit("Available_Vehicles", data);
        payload && payload.callback();
        commit("Set_Main_Loading", false);
      });
    },
    addVehicle({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "files",
        "ownerId",
        "driverId",
        "color",
        "ownerShipFile",
        "ownerShip",
      ]);

      formData.append("color", payload.dto.color.hex ? payload.dto.color.hex : (payload.dto.color ? payload.dto.color : '#000000'));
      payload.dto.files.forEach((file) => {
        formData.append(`files`, file);
      });

      formData.append("ownerId", payload.dto.ownerId.id);
      payload.dto.ownerShipFile[0] &&
        formData.append("ownerShipFile", payload.dto.ownerShipFile[0]);

      formData.append("driverId", payload.dto.driverId.id);

      api.post("Vehicle/Add", formData, payload.callback);
    },
    updateVehicle({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "files",
        "ownerId",
        "driverId",
        "color",
        "documents",
        "ownerLogs",
        "driverName",
        "ownerShipFile",
        "ownerShip",
      ]);

      formData.append("color", payload.dto.color.hex ? payload.dto.color.hex : (payload.dto.color ? payload.dto.color : '#000000'));

      payload.dto.documents.forEach((doc) => {
        formData.append(`documentIds`, doc.id);
      });
      payload.dto.files.forEach((file) => {
        formData.append(`files`, file);
      });

      formData.append("ownerId", payload.dto.ownerId.id);
      payload.dto.ownerShipFile[0] &&
        formData.append("ownerShipFile", payload.dto.ownerShipFile[0]);
      payload.dto.ownerShip[0] &&
        formData.append("ownerShip", payload.dto.ownerShip[0].src);

      formData.append("driverId", payload.dto.driverId.id);

      api.post("Vehicle/Modify", formData, payload.callback);
    },
    deleteVehicle({ commit }, payload) {
      commit("Set_Main_Loading", true);
      api.delete("Vehicle/Remove?id=" + payload.id, () => {
        commit("Delete_Vehicle", payload.id);
        payload.callback();
        commit("Set_Main_Loading", false);
      });
    },
  },
};
