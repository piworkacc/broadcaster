module.exports = {
  authenticated(req, res, next) {
    if (req.session.userId) return next();
    const err = new Error('Unauthorized');
    err.status = 401;
    next(err);
  },
};
