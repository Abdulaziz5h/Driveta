import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import modules from './modules';

export default new Vuex.Store({
  modules,
  actions: {
    reset({commit}) {
      // resets state of all the modules
      Object.keys(modules).forEach(moduleName => {
        commit(`${moduleName}/Reset`);
      })
      commit(`Reset_Setting`);
      commit(`Reset_Shared`);
    }
  },
});
