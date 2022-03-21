const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

require('dotenv').config();

const { User } = require('../db/models');

const {
  makeStreamSource,
  changeExtension,
  randomString,
} = require('./miscellaneous');

const {
  getActiveStreams,
  getUserFinishedStreams,
  getUsersWithStreams,
  getStreamById,
  createStream,
  addTagsToStream,
  tags,
  getLatestStreamKeyByUserId,
} = require('./model');

function hashIt(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

function setSession(req, user) {
  req.session.userId = user.id;
  req.session.userName = user.name;
}

// USERS

async function addUser(req, res, next) {
  const { name, email, password } = req.body;
  // const streamKey = hashIt(name + email + password);
  const body = {
    name,
    email,
    password: hashIt(password),
    // stream_key: streamKey,
  };
  try {
    const newUser = await User.create(body);
    setSession(req, newUser);
    res.json({
      name: newUser.name,
      id: newUser.id,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const pwd = hashIt(req.body.password);
    const user = await User.findOne({
      where: { password: pwd, email: req.body.email },
    });
    if (user) {
      delete user.password;
      req.session.user = user;
      setSession(req, user);
      res.json({ name: user.name, id: user.id });
    } else {
      const err = new Error('Unauthorized');
      err.status = 401;
      throw err;
    }
  } catch (err) {
    next(err);
  }
}

function logout(req, res) {
  req.session.destroy(() => {
    res.clearCookie(process.env.COOKIE);
    res.json({ ok: true });
  });
}

function auth(req, res) {
  res.json({
    name: req.session.userName,
    id: req.session.userId,
  });
}

// KEYS

function newKey(req, res) {
  res.json({ key: randomString() + randomString() });
}

async function latestStreamKey(req, res, next) {
  try {
    const foundKey = await getLatestStreamKeyByUserId(req.session.userId);
    if (!foundKey) {
      res.json({ stream_key: '' });
    } else {
      res.json(foundKey);
    }
  } catch (err) {
    next(err);
  }
}

// STREAMS

async function streams(req, res, next) {
  try {
    const result = await getActiveStreams();
    if (!result) {
      res.json([]);
      return;
    }
    res.json(
      result.map((el) => ({
        id: el.id,
        broadcast_id: el.broadcast_id,
        title: el.title,
        start: el.start,
        preview: el.preview,
        User: el.User,
        source: `/live/${el.stream_key}.flv`,
        Tags: el.Tags,
        // comments: el.Comments,
      })),
    );
  } catch (err) {
    next(err);
  }
}

async function userFinishedStreams(req, res, next) {
  try {
    const foundStreams = await getUserFinishedStreams([req.params.userId]);
    if (!foundStreams) {
      res.json([]);
    }
    const results = foundStreams.map((el) => {
      const obj = el.dataValues;
      obj.source = makeStreamSource(el.id);
      return obj;
    });
    res.json(results);
  } catch (err) {
    next(err);
  }
}

async function streamsSelection(req, res, next) {
  const amount = +req.params.amount;
  try {
    const users = await getUsersWithStreams(amount);
    if (!users || !users.length) {
      res.json([]);
      return;
    }
    const userStreams = await getUserFinishedStreams(users.map((el) => el.id));

    const structure = {};
    userStreams.forEach((el) => {
      if (!structure[el.user_id]) {
        structure[el.user_id] = [];
      }
      structure[el.user_id].push(el.dataValues);
    });

    const result = [];
    const keys = Object.keys(structure);
    for (let i = 0; true; i += 1) {
      let added = false;
      keys.forEach((el) => {
        if (structure[el][i] && result.length < amount) {
          added = true;
          const obj = structure[el][i];
          obj.source = makeStreamSource(obj.id);
          result.push(obj);
        }
      });
      if (!added || result.length >= amount) {
        break;
      }
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function sendStream(req, res, next) {
  try {
    const { id } = req.params;
    const stream = await getStreamById(id);
    if (!stream) {
      throw new Error('stream not found');
    }

    // sending video stream
    const { range } = req.headers;

    if (!range) {
      const err = new Error('Requires Range header');
      err.status = 400;
      throw err;
    }
    const videoPath = stream.path;
    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': contentLength,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
  } catch (err) {
    next(err);
  }
}

async function preview(req, res, next) {
  try {
    const { id } = req.params;
    const stream = await getStreamById(id);
    if (!stream) {
      throw new Error('stream not found');
    }

    if (!stream.path) {
      throw new Error('stream path not found');
    }
    const previewPath = changeExtension(stream.path, 'jpg');
    const fullPreviewPath = path.join(process.env.PWD, previewPath.slice(1));
    if (!fs.existsSync(fullPreviewPath)) {
      const execPath = `ffmpeg -ss 01:00:10 -y -i ${stream.path} -frames:v 1 -q:v 2 ${previewPath}`;
      await exec(execPath);
    }
    res.sendFile(fullPreviewPath);
  } catch (err) {
    next(err);
  }
}

async function addStream(req, res, next) {
  try {
    const { tags: tagsArr, ...fields } = req.body;
    fields.user_id = req.session.userId;
    const newStream = await createStream(fields);
    await addTagsToStream(newStream, tagsArr);
    res.send(await getStreamById(newStream.id));
  } catch (err) {
    next(err);
  }
}

async function getTags(req, res, next) {
  try {
    const foundTags = await tags();
    res.send(foundTags);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addUser,
  login,
  logout,
  auth,
  streams,
  userFinishedStreams,
  streamsSelection,
  sendStream,
  preview,
  newKey,
  addStream,
  getTags,
  latestStreamKey,
};
