const express = require('express');

const postController = require('../controllers/postController');

const router = express.Router();

router.get('/posts', postController.getPosts);

router.post('/post', postController.createPost);

router.get('/post/:postId', postController.getPost);

router.put('/post/:postId', postController.updatePost);

router.delete('/post/:postId', postController.deletePost);

module.exports = router;