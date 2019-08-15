import Vue from 'vue';
import Vuex from 'vuex';
import auth from './auth';
import doctor from './doctor';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    doctor
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
    viewing(state) {
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
