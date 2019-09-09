import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import doctor from './doctor';
import classify from './classify';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    doctor,
    classify
  },
  state: {
    sidebar: true,
    viewing: false,
  },
  mutations: {
    set_sidebar(state, value) {
      state.sidebar = value;
    },
    viewing(state) {
      state.viewing = true;
    },
    viewed(state) {
      state.viewing = false;
    },
  },
  actions: {
    toggleSidebar({ state, commit }) {
      commit('set_sidebar', !state.sidebar);
    },
  },
  getters: {
    sidebar: state => state.sidebar,
    viewing: state => state.viewing,
  },
});
