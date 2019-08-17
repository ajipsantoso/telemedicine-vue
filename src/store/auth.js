import api, { setAccessToken } from '../api';
import token from '../utils/token';
import status from '../utils/status';
import menu from '../utils/menu';

export default {
  namespaced: true,
  state: {
    user: null,
    token: token.get(),
    status: status.get(),
    isDoctor: status.check(),
    isLogedIn: token.exists(),
    listMenu: [],
  },
  mutations: {
    SET_USER(state, data) {
      state.user = data;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_LOGEDIN(state, status) {
      state.isLogedIn = status;
    },
    SET_STATUS(state, status) {
      state.status = status;
    },
    SET_ISDOCTOR(state, status) {
      state.isDoctor = status;
    },
    SET_LIST_MENU(state, menu) {
      state.listMenu = menu;
    }
  },
  actions: {
    loginDoctor({ commit }, credentials) {
      return api.auth
        .login['doctor'](credentials)
        .then(({ data }) => {
          if (data.status === 'success') {
            setAccessToken(data.data.session);
            token.set(data.data.session);
            status.set('doctor');
            commit('SET_LOGEDIN', true);
            commit('SET_USER', data.data);
            commit('SET_TOKEN', data.data.session);
            commit('SET_STATUS', 'doctor');
            commit('SET_ISDOCTOR', true)
            return data.data;
          } else {
            console.log('err login', data);
            return false;
          }
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    },
    loginPatient({ commit }, credentials) {
      return api.auth
        .login['patient'](credentials)
        .then(({ data }) => {
          if (data.status === 'success') {
            setAccessToken(data.data.session);
            token.set(data.data.session);
            commit('SET_LOGEDIN', true);
            commit('SET_USER', data.data);
            commit('SET_TOKEN', data.data.session);
            commit('SET_STATUS', data.data.session);
            commit('SET_ISDOCTOR', false);
            return data.data;
          } else {
            console.log('err login', data);
            return false;
          }
        })
        .catch(err => {
          console.log(err);
          return false;
        });
    },
    logout({ commit }, credentials) {
      commit('set_Logedin', false);
      commit('SET_USER', null);
      commit('SET_USER_ROLE',null);
      commit('set_token', null);
      token.clear();
    },
    userDetail({ commit }, status) {
      console.log(api.auth, status)
      return api.auth
        .ping[status]()
        .then(({ data }) => {
          console.log(data);
          if (data.status === 'success') {
          commit('SET_USER',data.data);
          commit('SET_LIST_MENU',menu['doctor']);
          return data.data;
          } else {
            console.log(data)
            return false;
          }
        })
        .catch(err => {
          console.log(err)
          return false;
        })
    },
      // patient({ commit }) {
      //   return api.user
      //     .ping['patient']()
      //     .then(({ data }) => {
      //       console.log(data);
      //       if (data.status === 'success') {
      //         commit('SET_USER',data.data);
      //         commit('SET_LIST_MENU',menu['patient']);
      //         return data.data;
      //       } else {
      //         console.log(data)
      //         return false;
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err)
      //       return false;
      //     })
      // },
  },
  getters: {
    user: state => state.user,
    token: state => state.token,
    isLogedIn: state => state.isLogedIn,
    status: state => state.status,
    isDoctor: state => state.isDoctor
  }
};
