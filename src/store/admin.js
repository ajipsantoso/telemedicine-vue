import api from '../api';


export default {
  namespaced: true,
  state: {
    listUser: [],
  },
  mutations: {
    SET_LIST_USER(state, data) {
      state.listUser = data;
    }
  },
  actions: {
    getAdminPatient({ commit }) {
      commit('SET_LIST_USER',[]);
      return api.admin
        .getAdminPatient()
        .then(({ data }) => {
          console.log(data);
          if (data.status === 'success') {
            commit('SET_LIST_USER',data.data);
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
    getAdminDoctors({ commit }) {
      commit('SET_LIST_USER',[]);
      return api.admin
        .getAdminDoctors()
        .then(({ data }) => {
          console.log(data);
          if (data.status === 'success') {
            commit('SET_LIST_USER',data.data);
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
    addPatient({ commit }, data) {
      return api.doctor
        .addPatient(data)
        .then(({ data }) => {
          console.log(data);
          if (data.status === 'success') {
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
    addDoctor({ commit }, data) {
      return api.doctor
        .addDoctor(data)
        .then(({ data }) => {
          console.log(data);
          if (data.status === 'success') {
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
    updateDoctor({ commit }, data) {
      return api.admin
        .updateDoctor(data)
        .then(({ data }) => {
          console.log(data);
          if (data.status === 'success') {
            return data;
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
    updatePatient({ commit }, data) {
      return api.admin
        .updatePatient(data)
        .then(({ data }) => {
          console.log(data);
          if (data.status === 'success') {
            return data;
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
  },
  getters: {
    listUser: state => state.listUser
  }
};
