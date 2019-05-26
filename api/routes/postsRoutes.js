const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const PostsController = require('../controllers/postsController');

router.post('/', PostsController.createPost);
router.patch('/:postId', PostsController.updatePost);
router.delete('/:postId', PostsController.removePost);

router.get('/mail', PostsController.sendMailTest);
router.get('/:postId', PostsController.getPost);
router.get('/:limit/:page/:field/:value', PostsController.listPosts);

module.exports = router;