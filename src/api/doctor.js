import { ApiDoctor } from './index';

export default {
  getPatient() {
    return ApiDoctor.get(`/get_patients`);
  },
  addPatient(data) {
    return ApiDoctor.post(`/add_patient`, data);
  },
};