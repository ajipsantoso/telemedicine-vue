import api from '../api';


export default {
  namespaced: true,
  state: {
    listRecord: [],
  },
  mutations: {
    SET_LIST_RECORD(state, data) {
      state.listRecord = data;
    }
  },
  actions: {
    getRecord({ commit }) {
      return api.patient
        .getRecord()
        .then(({ data }) => {
          console.log(data);
          if (data.status === 'success') {
            commit('SET_LIST_RECORD',data.data);
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
    listRecord: state => state.listRecord
  }
};
