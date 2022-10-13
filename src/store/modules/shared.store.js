import { getAll } from "@actions/shared.action";
import { getSearchResultOnRow, resetState } from "@core/util/global";

export const bloodType = "BloodType";
export const vehicleType = "VehicleType";

const initState = () => ({
  filterDto: {},
  searchDto: {
    keys: [],
    query: "",
  },
  [bloodType]: [],
  [vehicleType]: [],
});
export default {
  state: initState(),
  getters: {
    countries(state, getter, glState) {
      return glState.setting.countries.filter((country) => {
        return getSearchResultOnRow(state, country);
      });
    },
    cities(state, getter, glState) {
      return glState.setting.cities.filter((city) => {
        return getSearchResultOnRow(state, city);
      });
    },
    areas(state, getter, glState) {
      return glState.setting.areas.filter((area) => {
        return getSearchResultOnRow(state, area);
      });
    },
    streets(state, getter, glState) {
      return glState.setting.streets.filter((street) => {
        return getSearchResultOnRow(state, street);
      });
    },
    models(state, getter, glState) {
      return glState.setting.models.filter((model) => {
        return getSearchResultOnRow(state, model);
      });
    },
    advertisements(state, getter, glState) {
      return glState["admin/advertisement"].advertisements.filter((ad) => {
        return getSearchResultOnRow(state, ad);
      });
    },
    offers(state, getter, glState) {
      return glState["admin/offer"].offers.filter((offer) => {
        return getSearchResultOnRow(state, offer);
      });
    },
    supports(state, getter, glState) {
      return glState["admin/support"].supports.filter((support) => {
        return getSearchResultOnRow(state, support);
      });
    },
    accountsList(state, getter, glState) {
      return glState["admin/accounts/management"].accounts.filter((account) => {
        return getSearchResultOnRow(state, account);
      });
    },
    stores(state, getter, glState) {
      return glState["admin/accounts/stores"].stores.filter((store) => {
        return getSearchResultOnRow(state, store);
      });
    },
    drivers(state, getter, glState) {
      return glState["admin/accounts/driver"].drivers.filter((driver) => {
        return getSearchResultOnRow(state, driver);
      });
    },
    owners(state, getter, glState) {
      return glState["admin/accounts/owner"].owners.filter((owner) => {
        return getSearchResultOnRow(state, owner);
      });
    },
    customers(state, getter, glState) {
      return glState["admin/accounts/customer"].customers.filter((customer) => {
        return getSearchResultOnRow(state, customer);
      });
    },
    vehicles(state, getter, glState) {
      return glState["admin/vehicle"].vehicles.filter((vehicle) => {
        return getSearchResultOnRow(state, vehicle);
      });
    },
    invoicesGroup(state, getter, glState) {
      return glState["admin/invoice"].invoicesGroup.filter((group) => {
        return getSearchResultOnRow(state, group);
      });
    },
    invoices(state, getter, glState) {
      return glState["admin/invoice"].invoices.filter((invoice) => {
        return getSearchResultOnRow(state, invoice);
      });
    },
    products(state, getter, glState) {
      return glState.products.products.filter((product) => {
        return getSearchResultOnRow(state, product);
      });
    },
  },
  mutations: {
    Reset_Shared(state) {
      resetState(state, initState);
    },
    Set_Filter_Dto(state, payload) {
      Object.keys(payload).forEach((key) => {
        state.filterDto[key] = payload[key];
      });
    },
    Set_Search_Dto(state, payload) {
      Object.assign(state.searchDto, payload);
    },
    Reset_Search_Dto(state) {
      Object.assign(state.searchDto, {
        keys: [],
        query: "",
      });
    },
    Reset_Filter_Dto(state) {
      Object.assign(state.filterDto, {});
    },
    Get_Enum_Select(state, { listName, data }) {
      state[listName] = data;
    },
  },
  actions: {
    getEnumSelect({ commit }, enumName) {
      commit("Set_Main_Loading", true);
      getAll(enumName, ({ data }) => {
        commit("Get_Enum_Select", { data, listName: enumName });
        commit("Set_Main_Loading", false);
      });
    },
  },
};
