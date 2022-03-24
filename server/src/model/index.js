const {
  Stream,
  StreamTag,
  Tag,
  Comment,
  User,
  Sequelize: {
    Op, literal, QueryTypes, fn, col,
  },
  Like,
  sequelize,
} = require('../../db/models');

function filterStreamsBySearchQuery(queryObject, searchQuery) {
  const buf = queryObject;
  if (searchQuery) {
    buf.where[Op.and] = literal(
      `("Stream"."title" ilike '%${searchQuery}%' or "User"."name" ilike '%${searchQuery}%' )`,
    );
  }
}

function getUsersWithStreams(limit, searchQuery) {
  const addClause = searchQuery
    ? `AND ("Stream"."title" ilike '%${searchQuery}%' or "User"."name" ilike '%${searchQuery}%' )`
    : '';

  const queryText = `SELECT DISTINCT
    "Stream"."user_id" as "id", "User"."name" AS "user_name" FROM "Streams" AS "Stream"
    JOIN "Users" AS "User" ON
    "Stream"."user_id" = "User"."id"
    WHERE
    "Stream"."path" IS NOT NULL
    ${addClause}
    LIMIT ${limit};`;

  return sequelize.query(queryText, { type: QueryTypes.SELECT });
}

function getStreamById(id) {
  return Stream.findOne({
    attributes: [
      'id',
      'broadcast_id',
      'title',
      'start',
      'path',
      'user_id',
      'preview',
      [fn('COUNT', col('Likes.id')), 'likesCount'],
    ],
    where: { id },
    include: [
      {
        model: Tag,
        attributes: ['tag'],
        through: { model: StreamTag, attributes: [] },
      },
      { model: User, attributes: ['id', 'name'] },
      { model: Like, attributes: [] },
    ],
    group: ['Stream.id', 'Tags.id', 'User.id'],
  });
}

function getStreamByStreamKey(streamKey) {
  return Stream.findOne({ where: { stream_key: streamKey } });
}

async function startStream(broadcastId, stream) {
  await Stream.update(
    { start: new Date(), end: null, broadcast_id: broadcastId },
    { where: { id: stream.id } },
  );

  return Stream.findOne({ where: { id: stream.id } });
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
  const currStreams = await Stream.findAll({
    where: {
      end: { [Op.is]: null },
      start: { [Op.not]: null },
      broadcast_id: { [Op.not]: null },
    },
  });

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

function getActiveStreams(searchQuery) {
  const queryObject = {
    attributes: [
      'id',
      'broadcast_id',
      'title',
      'start',
      'stream_key',
      'preview',
      [fn('COUNT', col('Likes.id')), 'likesCount'],
    ],
    include: [
      { model: User, attributes: ['name', 'id'] },
      {
        model: Tag,
        attributes: ['tag'],
        through: { model: StreamTag, attributes: [] },
      },
      { model: Like, attributes: [] },
    ],
    where: {
      end: { [Op.is]: null },
      start: { [Op.not]: null },
      broadcast_id: { [Op.not]: null },
    },
    group: ['Stream.id', 'Tags.id', 'User.id'],
  };

  filterStreamsBySearchQuery(queryObject, searchQuery);

  return Stream.findAll(queryObject);
}

function getUserFinishedStreams(userId, searchQuery) {
  const queryObject = {
    attributes: [
      'id',
      'broadcast_id',
      'title',
      'start',
      'path',
      'user_id',
      'preview',
      [fn('COUNT', col('Likes.id')), 'likesCount'],
    ],
    include: [
      {
        model: Tag,
        attributes: ['tag'],
        through: { model: StreamTag, attributes: [] },
      },
      { model: User, attributes: ['id', 'name'] },
      { model: Like, attributes: [] },
    ],
    where: {
      path: { [Op.not]: null },
      user_id: { [Op.in]: userId },
    },
    group: ['Stream.id', 'Tags.id', 'User.id'],
    order: [['updatedAt', 'DESC']],
  };
  filterStreamsBySearchQuery(queryObject, searchQuery);
  return Stream.findAll(queryObject);
}

function getLatestStreamKeyByUserId(userId) {
  return Stream.findOne({
    attributes: [
      'id',
      'broadcast_id',
      'title',
      'start',
      'path',
      'user_id',
      'preview',
      'stream_key',
    ],
    where: {
      user_id: userId,
    },
    order: [['createdAt', 'DESC']],
  });
}

function createStream(fields) {
  return Stream.create(fields);
}

// TAGS

async function addTagsToStream(stream, tagsArr) {
  if (!(tagsArr && tagsArr.length)) {
    return;
  }
  const prms = [];
  tagsArr.forEach((el) => {
    if (el) {
      prms.push(StreamTag.create({ stream_id: stream.id, tag_id: el }));
    }
  });
  await Promise.all(prms);
}

function tags() {
  return Tag.findAll();
}

// COMMENTS

function getCommentsByVideoId(videoId) {
  return Comment.findAll({
    where: { stream_id: videoId },
    include: [{ model: User, attributes: ['name', 'id'] }],
    order: [['createdAt', 'DESC']],
  });
}

function createComment(fields) {
  return Comment.create(fields);
}

function getCommentById(id) {
  return Comment.findOne({
    where: { id },
    include: [{ model: User, attributes: ['id', 'name'] }],
  });
}

module.exports = {
  getStreamByStreamKey,
  startStream,
  endStream,
  closeLostStreams,
  getAllUserStreams,
  getActiveStreams,
  getUserFinishedStreams,
  getUsersWithStreams,
  getStreamById,
  createStream,
  addTagsToStream,
  tags,
  getLatestStreamKeyByUserId,
  getCommentsByVideoId,
  createComment,
  getCommentById,
};
