import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import './plugins/vuetify';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './assets/css/style.css';

import registerComponents from './components';
import axios from 'axios';
import VueAxios from 'vue-axios';
 
Vue.use(VueAxios, axios)
registerComponents(Vue);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
