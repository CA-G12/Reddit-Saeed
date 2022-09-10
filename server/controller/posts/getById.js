const { getPost } = require('../../database/queries/posts');
const custumError = require('../../custumError');

module.exports = (req, res, next) => {
  try {
    const id = req.params.id;
    getPost(id)
      .then((data) => {
        if (data.rows.length === 0) {
          throw custumError('not found', 404);
        } else {
          return data.rows[0];
        }
      })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};
