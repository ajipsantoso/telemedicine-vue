import { ApiDoctor } from './index';

export default {
  getRecord(id) {
    return ApiDoctor.get(`/get_records`, {
      params: {
        patient_id: id
      }
    });
  }
};