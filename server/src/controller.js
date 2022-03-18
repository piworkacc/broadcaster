const crypto = require('crypto');
require('dotenv').config();
const { User } = require('../db/models');

function hashIt(str) {
  return crypto.createHash('sha256').update(str).digest('hex');
}

function setSession(req, user) {
  req.session.userId = user.id;
  req.session.userName = user.name;
}

// USERS

async function addUser(req, res, next) {
  try {
    const body = { ...req.body, password: hashIt(req.body.password) };
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
    id: req.session.userId });
}

module.exports = {
  addUser,
  login,
  logout,
  auth,
};
