import api from '../api';


export default {
  namespaced: true,
  state: {
    listPatient: [],
  },
  mutations: {
    SET_LIST_PATIENT(state, data) {
      state.listPatient = data;
    }
  },
  actions: {
    getPatient({ commit }) {
      return api.doctor
        .getPatient()
        .then(({ data }) => {
          console.log(data);
          if (data.status === 'success') {
            commit('SET_LIST_PATIENT',data.data);
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
    }
  },
  getters: {
    listPatient: state => state.listPatient
  }
};
