function getFormat(value, from) {
  if (from && from.toLowerCase() === 'card' && String(value).length > 3) {
    return '---';
  }
  if (String(value).length > 6) {
    return `${String(value || '').slice(0, 6)}...`;
  }
  return value;
}

function measurementFormat(value, title) {
  if (title && title.toLowerCase() === 'height') {
    return `${(String(Math.round(value * 3.93701)) || '').slice(0, 6)} "`;
  }
  if (title && title.toLowerCase() === 'weight') {
    return `${(String(Math.round(value / 4.536)) || '').slice(0, 6)} lb`;
  }
  return value;
}

export {
  measurementFormat,
  getFormat,
};
