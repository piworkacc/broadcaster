const {
  User,
  Stream,
  Sequelize: { Op, fn, col },
} = require('../db/models');

function getUsersWithStreams(limit) {
  return Stream.findAll({
    attributes: [[fn('DISTINCT', col('user_id')), 'id']],
    limit,
    where: { path: { [Op.not]: null } },
    // order: [['updatedAt', 'DESC']],
  });
}

function getStreamById(id) {
  return Stream.findOne({ where: { id } });
}

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

async function closeLostStreams(getStreamPathName) {
  const streams = await Stream.findAll({
    where: {
      end: { [Op.is]: null },
    },
    include: User,
  });

  const currStreams = streams.map((el) => ({
    id: el.id,
    user: { streamKey: el.stream_key },
    start: el.start,
  }));
  const prms = [];
  currStreams.forEach((el) => {
    prms.push(getStreamPathName(el));
  });

  const paths = await Promise.all(prms);

  prms.splice();

  currStreams.forEach((el, ind) => {
    const prm = Stream.update(
      { end: new Date(), path: paths[ind] },
      { where: { id: el.id } },
    );
    prms.push(prm);
  });
  return Promise.all(prms);
}

function getAllUserStreams(userId) {
  return Stream.findAll({ where: { user_id: userId } });
}

function getActiveStreams() {
  return Stream.findAll({
    attributes: ['id', 'broadcast_id', 'title', 'start', 'stream_key'],
    // include: {
    //   model: User,
    //   attributes: ['stream_key'],
    // },
    where: {
      end: { [Op.is]: null },
    },
  });
}

function getUserFinishedStreams(userId) {
  return Stream.findAll({
    attributes: ['id', 'broadcast_id', 'title', 'start', 'path', 'user_id'],
    where: {
      path: { [Op.not]: null },
      user_id: { [Op.in]: userId },
    },
    order: [['updatedAt', 'DESC']],
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
  getUsersWithStreams,
  getStreamById,
};
