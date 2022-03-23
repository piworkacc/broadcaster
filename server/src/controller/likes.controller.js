const { streamLikes, addLike, destroyLike } = require('../model/likes.model');

async function getStreamLikes(req, res, next) {
  try {
    const result = await streamLikes(req.params.stream_id, req.session.userId);
    res.json(result);
  } catch (error) {
    next(error);
  }
}

async function postLike(req, res, next) {
  try {
    const { streamId } = req.body;
    const { userId } = req.session;
    if (userId) {
      let likes = await streamLikes(streamId, userId);
      if (!likes.dataValues.liked) {
        await addLike(streamId, userId);
      } else {
        await destroyLike(streamId, userId);
      }
      likes = await streamLikes(streamId, userId);
      res.json(likes);
    } else {
      throw new Error('You are unaothorized');
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getStreamLikes,
  postLike,
};
