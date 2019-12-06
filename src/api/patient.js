import { ApiPatient } from './index';

export default {
  getRecord() {
    return ApiPatient.get(`/records`);
  },
};