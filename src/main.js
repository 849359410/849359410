import Vue from "vue";
import "./plugins/vuetify";
import Utils from "./plugins/utils"
import Vuetify from "vuetify";
import App from "./App.vue";
import store from "./store/store";
import router from "./router/index";
import * as Filters from "./plugins/filters";
import { setCookie, getCookie, delCookie } from "./config/cookie";
import Toast from "./components/toast";
import MonitorAlert from "./mixins/MonitorAlert";
import pageIndex from "./components/pageIndex";
import "./assets/stylesheets/custom.scss";

Vue.config.productionTip = false;
Vue.use(Utils);
Vue.use(Vuetify);
Vue.use({
	install: () => {
		Vue.prototype.$setCookie = setCookie;
		Vue.prototype.$getCookie = getCookie;
		Vue.prototype.$delCookie = delCookie;
		Vue.prototype.$toast = Toast;
		Vue.component('pageIndex', pageIndex);
	}
});
// 注册过滤器
Object.keys(Filters).map(key => {
	Vue.filter(key, Filters[key]);
});

new Vue({
  el: "#app",
	mixins: [MonitorAlert],
  router,
  store,
  render: h => h(App)
}).$mount("#app");
