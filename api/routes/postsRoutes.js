const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


//Middlewares
const SecurityCheckAuthMiddleware = require('../middlewares/check-auth');

//Controllers
const PostsController = require('../controllers/postsController');


router.post('/', PostsController.createPost);
//router.patch('/:postId', PostsController.updatePost);
//router.delete('/:postId', PostsController.removePost);

//router.get('/:postId', PostsController.getPost);
//router.get('/', PostsController.listPosts);



module.exports = router;

