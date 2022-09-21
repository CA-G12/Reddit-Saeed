const router = require('express').Router();
const authUser = require('../controller/users');

router.post('/users/signup', authUser.signUp);
router.post('/users/signin', authUser.signIn);
router.get('/users/signout', authUser.signOut);
router.get('/users/:id', authUser.getUser);
router.get('/users/:id', authUser.allUsers);

module.exports = router;
