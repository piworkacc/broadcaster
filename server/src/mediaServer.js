const NodeMediaServer = require('node-media-server');
const { getUserByStreamKey, startStream } = require('./model');

const config = require('../config/default').rtmp_server;

const nms = new NodeMediaServer(config);

const getStreamKeyFromStreamPath = (streamPath) => {
  const parts = streamPath.split('/');
  return parts[parts.length - 1];
};

nms.on('prePublish', async (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on prePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
  );
  const streamKey = getStreamKeyFromStreamPath(StreamPath);
  const user = await getUserByStreamKey(streamKey);
  if (!user) {
    console.error(
      `REJECTED: id=${id} StreamPath=${StreamPath} args=${JSON.stringify(
        args,
      )}`,
    );
    const session = nms.getSession(id);
    session.reject();
  } else {
    startStream(user, id);
  }
});

nms.on('donePublish', (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on donePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
  );
});

module.exports = nms;
