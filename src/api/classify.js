import { ApiDoctor, ApiGeneral } from './index';

export default {
  getRecord(id) {
    return ApiDoctor.get(`/get_records`, {
      params: {
        patient_id: id
      }
    });
  },
  uploadFile(data) {
    return ApiDoctor.post(`/upload_file`, data);
  },
  processFile(data) {
    return ApiDoctor.post(`/proses_rekam`, data);
  },
  getResRec({id}) {
    return ApiDoctor.get(`/get_result`, {
      params: {
        record_id: id
      }
    });
  },
  staticFile(params) {
    return ApiGeneral.get(`/file/result/${params.filePath}/ECG-${params.fileName}.json`);
  },
  updateFile(data) {
    return ApiDoctor.post(`/update_rekam`, data);
  }
};