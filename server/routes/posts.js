const { isUserAuth } = require('../middlware');
const router = require('express').Router();
const postController = require('../controller/posts');

router.get('/posts', postController.getPosts);
router.get('/posts/:id', isUserAuth, postController.getPost);
router.post('/posts', isUserAuth, postController.createPost);
router.put('/posts/:id', isUserAuth, postController.updatePost);
router.delete('/posts/:id', isUserAuth, postController.deletePost);

module.exports = router;
