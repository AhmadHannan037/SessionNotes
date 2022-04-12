import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify"; // path to vuetify export
import store from './store'
Vue.config.productionTip = false;

new Vue({
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
