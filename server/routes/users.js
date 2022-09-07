// const { signUp } = require('../controller/users')
// const { signIn } = require('../controller/users')
const authUser = require('../controller/users')
const router = require('express').Router()

router.post('/users/signup', authUser.signUp)
router.post('/users/signin', authUser.signIn)
router.get('/users/signout', authUser.signOut)
module.exports = router
