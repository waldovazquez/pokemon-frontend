function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key) {
  const data = localStorage.getItem(key);
  if (data) return JSON.parse(data);
  return null;
}

function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

export {
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
};
