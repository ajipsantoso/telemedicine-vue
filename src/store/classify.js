import api from '../api';


export default {
  namespaced: true,
  state: {
    userData: null,
    listRecord: [],
    viewing: false
  },
  mutations: {
    SET_USER_DATA(state, data) {
      state.userData = data;
    },
    SET_LIST_RECORD(state, data) {
      state.listRecord = data;
    },
    VIEWING(state) {
      state.viewing = true;
    },
    VIEWED(state) {
      state.viewing = false;
    }
  },
  actions: {
    getRecord({ commit }, { id }) {
      return api.classify
        .getRecord(id)
        .then(({ data }) => {
          console.log('record', data);
          if (data.status === 'success') {
            commit('SET_LIST_RECORD', data.data)
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
    userData: state => state.userData,
    listRecord: state => state.listRecord,
    viewing: state => state.viewing
  }
};
