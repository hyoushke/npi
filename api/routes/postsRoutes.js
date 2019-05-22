const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


//Middlewares
const SecurityCheckAuthMiddleware = require('../middlewares/check-auth');

//Controllers
const PostsController = require('../controllers/postsController');


router.post('/', PostsController.createPosts);
//router.patch('/:postId', PostsController.updatePost);
//router.delete('/:postId', PostsController.removePost);


//router.get('/', PostsController.listPosts);
//router.get('/:postId', PostsController.getPost);


module.exports = router;

