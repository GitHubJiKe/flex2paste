import Vue from "vue";
import App from "./App.vue";
import Modal2Vue from "modal2vue";
Vue.config.productionTip = false;
Vue.use(Modal2Vue);
new Vue({
  render: h => h(App)
}).$mount("#app");
