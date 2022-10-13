import { signin as _signin } from "@actions/account.action";
import { create } from "@actions/user.action";
import { getAll, getById, modify } from "@actions/customer.action";
import { formDataFromObj } from "@core/util/global";
import { resetState } from "@core/util/global";

const initState = () => ({
  customers: [],
});

export default {
  state: initState(),
  mutations: {
    Reset_Customers(state) {
      resetState(state, initState);
    },
    Get_Customers(state, data) {
      state.customers = data;
    },
  },
  actions: {
    signin(ctx, payload) {
      return _signin(payload.dto, payload.callback, payload.catch);
    },
    getCustomers({ commit }) {
      commit("Set_Main_Loading", true);
      getAll(({ data }) => {
        commit("Get_Customers", data);
        commit("Set_Main_Loading", false);
      });
    },
    getCustomerById({ commit }, paylaod) {
      commit("Set_Main_Loading", true);
      getById(paylaod.id, paylaod.callback);
    },
    modifyCustomer({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto, [
        "dateBlocked",
        "deliveries",
        "personalImageFile",
        "personalImage",
      ]);
      if (payload.dto.personalImageFile[0])
        formData.append("personalImageFile", payload.dto.personalImageFile[0]);
      if (payload.dto.personalImage[0])
        formData.append("personalImage", payload.dto.personalImage[0].src ? payload.dto.personalImage[0].src : '');

      modify(formData, payload.callback);
    },
    signup({ commit }, payload) {
      commit("Set_Main_Loading", true);
      const formData = formDataFromObj(payload.dto);
      create(formData, payload.callback);
    },
    deleteCustomers() { },
  },
};
