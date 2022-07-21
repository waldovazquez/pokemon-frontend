function getFormat(title, value) {
  if (title.toLowerCase() === 'height') {
    return `${value || ''}"`;
  } if (title.toLowerCase() === 'weight') {
    return `${value || ''} lb`;
  }
  return value;
}

export {
  getFormat,
};
