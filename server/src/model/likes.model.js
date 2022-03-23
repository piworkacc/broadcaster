const {
  Sequelize: { literal, fn, col },
  Like,
} = require('../../db/models');

function streamLikes(streamId, userId) {
  const queryObj = {
    attributes: [[fn('COUNT', col('Like.id')), 'likesCount']],
    where: { stream_id: streamId },
  };
  if (userId) {
    queryObj.attributes.push([
      literal(`MAX(CASE user_id WHEN ${userId} THEN 1 ELSE 0 END)`),
      'liked',
    ]);
  }
  return Like.findOne(queryObj);
}

function addLike(streamId, userId) {
  return Like.create({
    user_id: userId,
    stream_id: streamId,
  });
}

function destroyLike(streamId, userId) {
  return Like.destroy({
    where: {
      user_id: userId,
      stream_id: streamId,
    },
  });
}

module.exports = { streamLikes, addLike, destroyLike };
