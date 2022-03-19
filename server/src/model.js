const {
  User,
  Stream,
  Sequelize: { Op },
} = require('../db/models');

async function getUserByStreamKey(streamKey) {
  const user = await User.findOne({ where: { stream_key: streamKey } });
  if (!user) return undefined;
  return { id: user.id, name: user.name, streamKey };
}

function startStream(user, broadcastId) {
  const title = `stream_${Math.random().toString(32).replace('.', '')}`;
  return Stream.create({
    user_id: user.id,
    broadcast_id: broadcastId,
    title,
    start: new Date(),
  });
}

function endStream(broadcastId, filePath) {
  Stream.update(
    {
      end: new Date(),
      path: filePath,
    },
    {
      where: { broadcast_id: broadcastId },
    },
  );
}

function closeLostStreams() {
  Stream.update(
    {
      end: new Date(),
    },
    {
      where: {
        end: { [Op.is]: null },
      },
    },
  );
}

function getAllUserStreams(userId) {
  return Stream.findAll({ where: { user_id: userId } });
}

function getActiveStreams() {
  return Stream.findAll({
    attributes: ['id', 'broadcast_id', 'title', 'start'],
    include: {
      model: User,
      attributes: ['stream_key'],
    },
    where: {
      end: { [Op.is]: null },
    },
  });
}

function getUserFinishedStreams(userId) {
  return Stream.findAll({
    attributes: ['id', 'broadcast_id', 'title', 'start', 'path'],
    where: {
      path: { [Op.not]: null },
      user_id: userId,
    },
  });
}

module.exports = {
  getUserByStreamKey,
  startStream,
  endStream,
  closeLostStreams,
  getAllUserStreams,
  getActiveStreams,
  getUserFinishedStreams,
};
