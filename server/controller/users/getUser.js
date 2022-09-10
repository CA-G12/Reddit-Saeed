const { getUser } = require('../../database/queries/users');
const custumError = require('../../custumError');

module.exports = (req, res, next) => {
  try {
    const id = req.params.id;
    getUser(id)
      .then((data) => {
        if (data.rows.length === 0) {
          throw custumError('not found', 404);
        } else {
          const { username, avatar, email } = data.rows[0];
          return { username, avatar, email };
        }
      })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};
