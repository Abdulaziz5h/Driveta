import Vue from "vue";
import { $_themeConfig } from "@themeConfig";
// axios
import axios from "axios";
const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL: $_themeConfig.app.domainPath + "api/",
});
Vue.prototype.$http = axiosIns;
export default axiosIns;
