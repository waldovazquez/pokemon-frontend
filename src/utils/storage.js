function setSessionStorage(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

function getSessionStorage(key) {
  const data = sessionStorage.getItem(key);
  if (data) return JSON.parse(data);
  return null;
}

function removeSessionStorage(key) {
  sessionStorage.removeItem(key);
}

export {
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
};
