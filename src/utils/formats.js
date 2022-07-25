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

function getHeight(data, width) {
  if (((data.length >= 0 && data.length <= 8) && (width > 768))
    || ((data.length >= 8 && data.length <= 12) && (width > 992))
    || ((data.length >= 0 && data.length <= 2) && (width < 768))) {
    return '100vh';
  }
  return 'auto';
}

export {
  measurementFormat,
  getFormat,
  getHeight,
};
