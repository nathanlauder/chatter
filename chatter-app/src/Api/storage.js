const { localStorage } = window;

const ls = {
  set: (key, val) => localStorage.setItem(key, val),
  get: (key) => localStorage.getItem(key),
  clear: () => localStorage.clear()
};

module.exports = { ls };