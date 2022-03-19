const NodeMediaServer = require('node-media-server');
const { getUserByStreamKey } = require('./model');
const ActiveStreams = require('./ActiveStreams');
const config = require('../config/default').rtmp_server;

const activeStreams = new ActiveStreams();
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
  // checking user
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
    // start stream info
    await activeStreams.startStream(id, user);
  }
});

nms.on('donePublish', async (id, StreamPath, args) => {
  console.log(
    '[NodeEvent on donePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
  );
  // adding information about stream to db.

  await activeStreams.endStream(id);
});

module.exports = nms;
