import {
  getAllDrivers as _getAllDrivers,
  getAllOwners as _getAllOwners,
  GetDriverOwnerInvoice,
  FillDriverOwnerInvoice,
  AddDriverOwnerInvoice,
  GetDriverOwnerInvoiceById
} from "@actions/invoice.action.js";
import { resetState } from "@core/util/global";

const initState = () => ({
  invoices: [],
  invoicesGroup: [],
  userName: ''
});

export default {
  state: initState(),
  mutations: {
    Reset_Invoice(state) {
      resetState(state, initState);
    },
    Get_All_Drivers(state, data) {
      state.invoicesGroup = data;
    },
    Get_Driver_Owner_Invoice(state, data) {
      state.invoices = data.invoices;
      state.userName = data.userName;
    }
  },
  actions: {
    getAllDriversInvoices({ commit }) {
      commit("Set_Main_Loading", true);
      _getAllDrivers(({ data }) => {
        commit("Get_All_Drivers", data);
        commit("Set_Main_Loading", false);
      });
    },
    getAllOwnersInvoices({ commit }) {
      commit("Set_Main_Loading", true);
      _getAllOwners(({ data }) => {
        commit("Get_All_Drivers", data);
        commit("Set_Main_Loading", false);
      });
    },
    getDriverOwnerInvoice({ commit }, id) {
      commit("Set_Main_Loading", true);
      GetDriverOwnerInvoice(id, ({ data }) => {
        commit('Get_Driver_Owner_Invoice', data)
        commit("Set_Main_Loading", false);
      })
    },
    fillDriverOwnerInvoice({ commit }, payload) {
      commit("Set_Main_Loading", true);
      FillDriverOwnerInvoice(payload.id, payload.type, payload.callback)
    },
    addDriverOwnerInvoice({ commit }, payload) {
      commit("Set_Main_Loading", true);
      AddDriverOwnerInvoice(payload.dto, payload.callback)
    },
    getDriverOwnerInvoiceById({ commit }, payload) {
      commit("Set_Main_Loading", true);
      GetDriverOwnerInvoiceById(payload.id, payload.callback)
    }
  },
};
