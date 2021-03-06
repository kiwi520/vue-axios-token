import Vue from 'vue'
import App from './App.vue'
import store from "./store";
// 引入封装的router
import router from '@/router/index'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.config.productionTip = false


Vue.use(Antd);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
