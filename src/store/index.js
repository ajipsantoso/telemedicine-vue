import Vue from 'vue';
import Vuex from 'vuex';
import admin from './admin';
import auth from './auth';
import doctor from './doctor';
import patient from './patient';
import classify from './classify';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    admin,
    auth,
    doctor,
    patient,
    classify
  },
  state: {
    sidebar: true,
    viewing: false,
    isPopUp: false
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
    POPING_UP(state) {
      state.isPopUp = true;
    },
    POPED_UP(state) {
      state.isPopUp = false;
    }
  },
  actions: {
    toggleSidebar({ state, commit }) {
      commit('set_sidebar', !state.sidebar);
    },
  },
  getters: {
    sidebar: state => state.sidebar,
    viewing: state => state.viewing,
    isPopUp: state => state.isPopUp
  },
});
