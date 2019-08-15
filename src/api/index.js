import axios from 'axios';
import auth from './auth';
import doctor from './doctor';
import token from '../utils/token';

export const ApiDoctor = axios.create({
  baseURL: `http://telemedicine.co.id:3000/doctor/`,
  timeout: 12000
});

export const ApiPatient = axios.create({
  baseURL: `http://telemedicine.co.id:3000/patient/`,
  timeout: 12000
});

export const setAccessToken = token => {
  console.log('settingTOKENaxios');
  axios.defaults.headers.common['Authorization'] = `${token}`;
  ApiPatient.defaults.headers.common['Authorization'] = `${token}`;
  ApiDoctor.defaults.headers.common['Authorization'] = `${token}`;
};

if (token.exists()) {
  console.log('settingTOKEN');
  setAccessToken(token.get());
}

export default {
  auth,
  doctor
};
