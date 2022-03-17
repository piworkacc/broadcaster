module.exports = {
  authenticated(req, res, next) {
    if (req.session.userId) return next();
    return res.sendStatus(401);
  },
};
