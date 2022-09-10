const { getPosts } = require('../../database/queries/posts');
// const custumError = require('../../custumError');

module.exports = (req, res, next) => {
  try {
    getPosts()
      .then((data) => {
        res.status(200).json(data.rows);
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};
