import { ApiDoctor, ApiPatient } from './index';

export default {
  login: {
    doctor(credentials) {
      return ApiDoctor.post(`/login`, credentials);
    },
    patient(credentials) {
      return ApiPatient.post(`/login`, credentials);
    }
  },
  ping: {
    doctor() {
      return ApiDoctor.get(`/ping`);
    },
    patient() {
      return ApiPatient.get(`/ping`);
    }
  }
};