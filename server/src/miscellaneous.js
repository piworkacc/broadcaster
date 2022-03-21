const makeStreamSource = (id) => `/api/streams/${id}`;

const changeExtension = (fileName, newExtension) => {
  const parts = fileName.split('.');
  parts.pop();
  parts.push(newExtension);
  return parts.join('.');
};

const randomString = () => Math.random().toString(32).replace('.', '');

module.exports = {
  makeStreamSource,
  changeExtension,
  randomString,
};
