import Vue from 'vue'
import App from './App.vue'
import router from './router/'
import store from './store/'
import Vuetify from 'vuetify/lib';
import VeeValidate from 'vee-validate';
import { registerMiddleware } from './router/middleware'

Vue.use(Vuetify);
Vue.use(VeeValidate);
let vuetify = new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes:{
      light: {
        primary: '#FC5A6B',
        secondary: '#EF798A',
        anchor: '#8c9eff',
        accent: '#A62639',
      },
    },
    // primary: '#EF798A',
    // // primary: '#FC5A6B',
    // secondary: '#F7B1AB',
    // accent: '#FC5A6B',
    // // accent: '#EF798A',
    // error: '#FF5252',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FFC107',
  },
});

registerMiddleware(router,store);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
