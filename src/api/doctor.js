import { ApiDoctor } from './index';

export default {
  getPatient() {
    return ApiDoctor.get(`/get_patients`);
  },
  getDoctors() {
    return ApiDoctor.get(`/get_doctors`);
  },
  addPatient(data) {
    return ApiDoctor.post(`/add_patient`, data);
  },
  addDoctor(data) {
    return ApiDoctor.post(`/add_doctor`, data);
  },
  updateDoctor(data) {
    return ApiDoctor.post(`/update_doctor`, data);
  },
  updatePatient(data) {
    return ApiDoctor.post(`/update_patient`, data);
  },
};