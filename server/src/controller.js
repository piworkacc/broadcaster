const crypto = require('crypto');
require('dotenv').config();
const { User } = require('../db/models');
const { getActiveStreams, getUserFinishedStreams } = require('./model');

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
  const streamKey = hashIt(name + email + password);
  const body = {
    name,
    email,
    password: hashIt(password),
    stream_key: streamKey,
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
      res.sendStatus(401);
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

// STREAMS

async function streams(req, res, next) {
  try {
    const result = await getActiveStreams();
    res.json(
      result.map((el) => ({
        id: el.id,
        broadcast_id: el.broadcast_id,
        title: el.title,
        start: el.start,
        link: `/live/${el.User.stream_key}.flv`,
      })),
    );
  } catch (err) {
    next(err);
  }
}

async function userFinishedStreams(req, res, next) {
  try {
    res.json(await getUserFinishedStreams(req.params.userId));
  } catch (err) {
    next(err);
  }
}

async function streamsSelection(req, res, next) {
  try {
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
};
