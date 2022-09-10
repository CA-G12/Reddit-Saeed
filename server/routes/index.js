const usersRouter = require('./users');
const postsRouter = require('./posts');
const router = require('express').Router();

router.use(usersRouter);
router.use(postsRouter);

module.exports = router;
