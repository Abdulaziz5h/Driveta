import {
  getAdminStatistics,
  getOwnerStatistics,
  getDriverStatistics,
  getCustomerStatistics,
  getStoreStatistics,
} from "@actions/statistics.action";
import { resetState } from "@core/util/global";

const initState = () => ({
  adminStatistics: {
    ownersCount: 0,
    storesCount: 0,
    driversCount: 0,
    customersCount: 0,
    deliveriesCount: 0,
    vehiclesCount: 0,
    totalDistance: 0,

    deliveryMonthly: [],
    distanceMonthly: [],

    benfitMonthly: [],
    incomeMonthly: [],
    outcomeMonthly: [],

    bestVehicles: [],
    bestDrivers: [],
    benfit: 0,
    income: 0,
    outcome: 0,
  },
  ownerStatistics: {
    vehicleCount: 0,
    driverCount: 0,
    deliveriesCount: 0,
    totalDistance: 0,
    income: 0,
    outcome: 0,
    benfit: 0,
    deliveryMonthly: [],
    incomeMonthly: [],
    outcomeMonthly: [],
    benfitMonthly: [],
    distanceMonthly: [],
  },
  driverStatistics: {
    vehicleCount: 0,
    deliveriesCount: 0,
    totalDistance: 0,
    income: 0,
    outcome: 0,
    benfit: 0,
    deliveryMonthly: [],
    incomeMonthly: [],
    outcomeMonthly: [],
    benfitMonthly: [],
    distanceMonthly: [],
  },
  customerStatistics: {},
  storeStatistics: {
    deliveriesCount: 0,
    income: 0,
    outcome: 0,
    benfit: 0,

    deliveryMonthly: [],
    incomeMonthly: [],
    outcomeMonthly: [],
    benfitMonthly: [],
  },
});
export default {
  state: initState(),

  mutations: {
    Reset_Statistics(state) {
      resetState(state, initState);
    },
    Get_Admin_Statistics(state, { result }) {
      Object.assign(state.adminStatistics, result);
    },
    Get_Owner_Statistics(state, { result }) {
      Object.assign(state.ownerStatistics, result);
    },
    Get_Driver_Statistics(state, { result }) {
      Object.assign(state.driverStatistics, result);
    },
    Get_Customer_Statistics(state, { result }) {
      Object.assign(state.customerStatistics, result);
    },
    Get_Store_Statistics(state, { result }) {
      Object.assign(state.storeStatistics, result);
    },
  },
  actions: {
    getAdminStatistics({ commit }) {
      commit("Set_Main_Loading", true);
      getAdminStatistics(({ data }) => {
        commit("Get_Admin_Statistics", data);
        commit("Set_Main_Loading", false);
      });
    },
    getOwnerStatistics({ commit }, id) {
      commit("Set_Main_Loading", true);
      getOwnerStatistics(id, ({ data }) => {
        commit("Get_Owner_Statistics", data);
        commit("Set_Main_Loading", false);
      });
    },
    getDriverStatistics({ commit }, id) {
      commit("Set_Main_Loading", true);
      getDriverStatistics(id, ({ data }) => {
        commit("Get_Driver_Statistics", data);
        commit("Set_Main_Loading", false);
      });
    },

    getCustomerStatistics({ commit }, id) {
      commit("Set_Main_Loading", true);
      getCustomerStatistics(id, ({ data }) => {
        commit("Get_Customer_Statistics", data);
        commit("Set_Main_Loading", false);
      });
    },
    getStoreStatistics({ commit }, id) {
      commit("Set_Main_Loading", true);
      getStoreStatistics(id, ({ data }) => {
        commit("Get_Store_Statistics", data);
        commit("Set_Main_Loading", false);
      });
    },
  },
};
