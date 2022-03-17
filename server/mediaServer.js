const NodeMediaServer = require('node-media-server');
const config = require('./config/default').rtmp_server;

const nms = new NodeMediaServer(config);

const getStreamKeyFromStreamPath = (path) => {
  const parts = path.split('/');
  return parts[parts.length - 1];
};

nms.on('prePublish', async (id, StreamPath, args) => {
  const stream_key = getStreamKeyFromStreamPath(StreamPath);
  console.log(
    '[NodeEvent on prePublish]',
    `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`,
  );
});

module.exports = nms;
