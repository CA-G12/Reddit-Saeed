const { allUsers } = require('../../database/queries/users');
const custumError = require('../../custumError');

module.exports = (req, res, next) => {
  try {
    allUsers()
      .then((data) => {
        if (data.rows.length === 0) {
          throw custumError('not found', 404);
        } else {
          return data;
        }
      })
      .then((users) => {
        res.status(200).json(users);
      })
      .catch((err) => next(err));
  } catch (err) {
    next(err);
  }
};
