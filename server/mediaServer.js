const NodeMediaServer = require('node-media-server');
const fs = require('fs/promises');
const path = require('path');
// const util = require('util');
// const exec = util.promisify(require('child_process').exec);

const config = require('./config/default').rtmp_server;

const nms = new NodeMediaServer(config);

const getStreamKeyFromStreamPath = (streamPath) => {
  const parts = streamPath.split('/');
  return parts[parts.length - 1];
};

const getKeyForFile = (streamPath) => {
  const streamKey = getStreamKeyFromStreamPath(streamPath);
  const randomKey = Math.random().toString(32).replace('.', '');
  const currDate = JSON.stringify(new Date())
    .slice(1, 20)
    .replace('T', '-')
    .replaceAll(':', '');

  return `${currDate}-${streamKey}-${randomKey}`;
};

async function createffmpegCommandsFile(fullPath, fileKey) {
  const stat = await fs.readdir(fullPath);

  const partnames = stat
    .filter((el) => el.endsWith('.ts'))
    .map((el) => path.join(`file '${el}'`));
  const fileName = path.join(fullPath, `${fileKey}.txt`);
  await fs.writeFile(fileName, partnames.join('\n'));

  return fileName;
}

nms.on('prePublish', async (id, StreamPath, args) => {
  // const stream_key = getStreamKeyFromStreamPath(StreamPath);
  // console.log(
  //   '[NodeEvent on prePublish]',
  //   `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
  // );
  nms.on('preConnect', (id, args) => {
    console.log(
      '[NodeEvent on preConnect]',
      `id=${id} args=${JSON.stringify(args)}`,
    );
    // let session = nms.getSession(id);
    // session.reject();
  });

  nms.on('postConnect', (id, args) => {
    console.log(
      '[NodeEvent on postConnect]',
      `id=${id} args=${JSON.stringify(args)}`,
    );
  });

  nms.on('doneConnect', (id, args) => {
    console.log(
      '[NodeEvent on doneConnect]',
      `id=${id} args=${JSON.stringify(args)}`,
    );
  });

  nms.on('prePublish', (id, StreamPath, args) => {
    console.log(
      '[NodeEvent on prePublish]',
      `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
    );

    // let session = nms.getSession(id);
    // session.reject();
  });

  nms.on('postPublish', (id, StreamPath, args) => {
    console.log(
      '[NodeEvent on postPublish]',
      `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
    );
  });

  nms.on('donePublish', async (id, StreamPath, args) => {
    console.log(
      '[NodeEvent on donePublish]',
      `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
    );
  });

  nms.on('prePlay', (id, StreamPath, args) => {
    console.log(
      '[NodeEvent on prePlay]',
      `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
    );
    // let session = nms.getSession(id);
    // session.reject();
  });

  nms.on('postPlay', (id, StreamPath, args) => {
    console.log(
      '[NodeEvent on postPlay]',
      `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
    );
  });

  nms.on('donePlay', (id, StreamPath, args) => {
    console.log(
      '[NodeEvent on donePlay]',
      `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
    );
  });
});

module.exports = nms;
