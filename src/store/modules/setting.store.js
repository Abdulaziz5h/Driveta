import area from "./setting-actions/area";
import city from "./setting-actions/city";
import country from "./setting-actions/country";
import street from "./setting-actions/street";
import model from "./setting-actions/model";
import { resetState } from "@core/util/global";

const initState = () => ({
  areas: [],
  cities: [],
  countries: [],
  streets: [],
  models: []
})

export default {
  state: initState(),
  mutations: {
    Reset_Setting(state) {
      resetState(state, initState);
    },
    Get_List(state, payload) {
      state[payload.list] = payload.data;
    },
    Set_List(state, payload) {
      state[payload.list].unshift(payload.data);
    },
    Update_By_Id(state, payload) {
      const index = state[payload.list].findIndex(
        (l) => l.id == payload.data.id
      );
      Object.assign(state[payload.list][index], payload.data);
    },
    Delete(state, payload) {
      payload.ids.forEach((id) => {
        const index = state[payload.list].findIndex((l) => l.id == id);
        state[payload.list].splice(index, 1);
      });
    },
  },
  actions: {
    // Countries Actions
    ...country,
    // Cities Actions
    ...city,
    // Areas Actions
    ...area,
    // Streets Actions
    ...street,
    // Model Actions
    ...model
  },
};
