const makeStreamSource = (stream) => {
  const source = stream.path?.startsWith('http')
    ? stream.path
    : `/api/streams/${stream.id}`;
  return source;
};

const changeExtension = (fileName, newExtension) => {
  const parts = fileName.split('.');
  parts.pop();
  parts.push(newExtension);
  return parts.join('.');
};

const randomString = () => Math.random().toString(32).replace('.', '');

const randomArrayElement = (array) => {
  const ind = Math.trunc(Math.random() * array.length);
  return array[ind];
};

module.exports = {
  makeStreamSource,
  changeExtension,
  randomString,
  randomArrayElement,
};
