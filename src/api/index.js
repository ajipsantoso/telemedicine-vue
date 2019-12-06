import axios from 'axios';
import admin from './admin';
import auth from './auth';
import doctor from './doctor';
import patient from './patient';
import classify from './classify';
import token from '../utils/token';

export const ApiGeneral = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}/`,
  timeout: 12000
});

export const ApiDoctor = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}/doctor/`,
  timeout: 12000
});

export const ApiPatient = axios.create({
  baseURL: `${process.env.VUE_APP_BASE_URL}/patient/`,
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
  admin,
  auth,
  classify,
  doctor,
  patient
};
