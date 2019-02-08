import "babel-polyfill";
import "@mdi/font/css/materialdesignicons.css"; // Ensure you are using css-loader
import Vue from "vue";
import "./plugins/vuetify";
import "./echarts";
const App = () => import("./App.vue");
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import axios from "axios";
import VueAxios from "vue-axios";
import VueRouter from "vue-router";
import Vuex from "vuex";
Vue.config.productionTip = false;
router.afterEach(function(to) {
  if (window.ga) {
    window.ga("set", "page", to.fullPath); // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
    window.ga("send", "pageview");
  }
});
Vue.use(VueRouter);
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
axios.defaults.headers = {
  "Content-Type": "application/json"
};
Vue.use(VueAxios, axios);
Vue.use(Vuex);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
