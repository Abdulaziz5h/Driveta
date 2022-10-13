import api from "@api";

import { formDataFromObj } from "@core/util/global";
import { nullGuid, isObject } from "@core/util/global/index.js";
import { resetState } from "@core/util/global";

const initState = () => ({
  drivers: [],
  driversSelect: []
});

export default {
  state: initState(),
  mutations: {
    Reset_Drivers(state) {
      resetState(state, initState);
    },
    Get_Drivers(state, payload) {
      state.drivers = payload;
    },
    Driver_Delete(state, id) {
      const index = state.drivers.findIndex((s) => s.id == id);
      state.drivers.splice(index, 1);
    },
    Get_Drivers_Select(state, data) {
      state.driversSelect = data;
    }
  },
  actions: {
    getDrivers({ commit }) {
      commit("Set_Main_Loading", true);
      api.get("Driver/GetAll", ({ data }) => {
        commit("Get_Drivers", data);
        commit("Set_Main_Loading", false);
      });
    },
    getDriversSelect({ commit }, payload) {
      commit("Set_Main_Loading", true);
      api.get(
        "Driver/GetSelect" +
        (payload && payload.id && payload.id != nullGuid
          ? "?id=" + payload.id
          : ""),
        ({ data }) => {
          commit("Get_Drivers_Select", data);
          payload && payload.callback();
          commit("Set_Main_Loading", false);
        }
      );
    },
    getDriver({ commit }, payload) {
      api.get("Driver/GetById?id=" + payload.id, payload.callback);
    },
    addDriver({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "idPhotoFile",
        "idPhoto",
        "personalImageFile",
        "personalImage",
        "drivingCertificateFile",
        "drivingCertificate",
        "dateBlocked",
        "vehicleId",
      ]);

      formData.append("idPhotoFile", payload.dto.idPhotoFile[0]);
      formData.append("personalImageFile", payload.dto.personalImageFile[0]);
      formData.append(
        "drivingCertificateFile",
        payload.dto.drivingCertificateFile[0]
      );
      payload.dto.vehicleId != nullGuid &&
        formData.append("vehicleId", payload.dto.vehicleId.id);

      api.post("Driver/Add", formData, payload.callback);
    },
    updateDriver({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "idPhotoFile",
        "idPhoto",
        "personalImageFile",
        "personalImage",
        "drivingCertificateFile",
        "drivingCertificate",
        "dateBlocked",
        "vehicleId",
      ]);

      if (payload.dto.idPhotoFile[0])
        formData.append("idPhotoFile", payload.dto.idPhotoFile[0]);
      if (payload.dto.idPhoto[0])
        formData.append("idPhoto", payload.dto.idPhoto[0].src);

      if (payload.dto.personalImageFile[0])
        formData.append("personalImageFile", payload.dto.personalImageFile[0]);
      if (payload.dto.personalImage[0])
        formData.append("personalImage", payload.dto.personalImage[0].src);

      if (payload.dto.drivingCertificateFile[0])
        formData.append(
          "drivingCertificateFile",
          payload.dto.drivingCertificateFile[0]
        );
      if (payload.dto.drivingCertificate[0])
        formData.append(
          "drivingCertificate",
          payload.dto.drivingCertificate[0].src
        );

      payload.dto.dateBlocked &&
        formData.append("dateBlocked", payload.dto.dateBlocked);
      if (isObject(payload.dto.vehicleId))
        formData.append("vehicleId", payload.dto.vehicleId.id);
      else formData.append("vehicleId", payload.dto.vehicleId);

      api.post("Driver/Modify", formData, payload.callback);
    },
    driverDelete({ commit }, payload) {
      commit("Set_Main_Loading", true);
      api.delete("Driver/Remove?id=" + payload.id, () => {
        commit("Driver_Delete", payload.id);
        payload.callback();
        commit("Set_Main_Loading", true);
      });
    },
  },
};
