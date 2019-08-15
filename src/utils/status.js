const ls = localStorage;

export default {
  get() {
    return ls.getItem('status');
  },
  set(value) {
    ls.setItem('status', value);
  },
  remove() {
    ls.removeItem('status');
  },
  exists() {
    return !!this.get();
  },
  check() {
    console.log(this.get() === 'doctor', this.get())
    return this.get() === 'doctor';
  },
  clear() {
    ls.clear();
  }
};