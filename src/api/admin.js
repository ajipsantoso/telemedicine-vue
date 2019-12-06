import { ApiDoctor } from './index';

export default {
  getAdminPatient() {
    return ApiDoctor.get(`/get_all_patients`);
  },
  getAdminDoctors() {
    return ApiDoctor.get(`/get_all_doctors`);
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