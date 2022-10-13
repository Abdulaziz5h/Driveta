import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./libs/i18n";


import VueCompositionAPI from '@vue/composition-api'
import './api_actions/account.action'
import bootstrapVue from 'bootstrap-vue'
import numFormat from 'vue-filter-number-format';
import numeral from 'numeral';

import "./global-components";
import "./libs/vue-datepicker";
import "./libs/apex-charts";

// plugins
import "./plugins/bootstrap-vue";
import "./libs/vue-phone-number";

import "@mdi/font/css/materialdesignicons.min.css";
import "vue-select/dist/vue-select.css";

import "./assets/scss/style.scss";

Vue.config.productionTip = false;

Vue.use(bootstrapVue)
Vue.use(VueCompositionAPI)

Vue.filter('numFormat', numFormat(numeral));

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
