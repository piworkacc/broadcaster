module.exports = {
  authenticated(req, res, next) {
    if (req.session.userId) {
      return next();
    }
    try {
      throw new Error('Unauthorized');
    } catch (err) {
      err.status = 401;
      return next(err);
    }
  },
};
