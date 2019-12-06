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
    uploadFile({ commit }, data) {
      return api.classify
        .uploadFile(data)
        .then(({data}) => {
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
    processFile({ commit }, data) {
      return api.classify
        .processFile(data)
        .then(({data}) => {
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
    staticFile({ commit }, data) {
      return api.classify
        .staticFile(data)
        .then(({data}) => {
          if (data) {
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
    getResRec({ commit }, params) {
      return api.classify
        .getResRec(params)
        .then(({data}) => {
          if (data.status === 'success') {
            // console.log(params.filename)
            data.data = data.data.filter(el=> {
              return el.filename === params.filename
            })
            // console.log('hasil',data)
            return data.data[0];
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
    updateFile({ commit }, data) {
      // console.log(data);
      return api.classify
        .updateFile(data)
        .then(({data}) => {
          if (data) {
            console.log(data)
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
