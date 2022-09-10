const { isUserAuth } = require('../middlware');
const router = require('express').Router();
const postController = require('../controller/posts');

router.use(isUserAuth);
router.get('/posts', postController.getPosts);
router.get('/posts/:id', postController.getPost);
router.post('/posts', postController.createPost);
router.put('/posts/:id', postController.updatePost);
router.delete('/posts/:id', postController.deletePost);

module.exports = router;
