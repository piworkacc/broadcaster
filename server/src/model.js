const { User, Stream } = require('../db/models');

async function getUserByStreamKey(streamKey) {
  const user = await User.findOne({ where: { stream_key: streamKey } });
  if (!user) return undefined;
  return { id: user.id, name: user.name };
}

async function startStream(user, broadcastId) {
  const title = `stream_${Math.random}`;
  const stream = await Stream.create({
    user_id: user.id,
    broadcast_id: broadcastId,
    title,
    start: new Date(),
  });
  return stream;
}

module.exports = { getUserByStreamKey, startStream };
