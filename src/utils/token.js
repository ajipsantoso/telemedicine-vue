const ls = localStorage;

export default {
  get() {
    return ls.getItem('telemedicine_token');
  },
  set(value) {
    ls.setItem('telemedicine_token', value);
  },
  remove() {
    ls.removeItem('telemedicine_token');
  },
  exists() {
    return !!this.get();
  },
  clear() {
    ls.clear();
  }
};
