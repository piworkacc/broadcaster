const makeStreamSource = (id) => `/api/streams/${id}`;

const changeExtension = (fileName, newExtension) => {
  const parts = fileName.split('.');
  parts.pop();
  parts.push(newExtension);
  return parts.join('.');
};

module.exports = {
  makeStreamSource,
  changeExtension,
};
