const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


//Middlewares
const SecurityCheckAuthMiddleware = require('../middlewares/check-auth');

//Controllers
const CommentsController = require('../controllers/commentsController');


router.post('/', CommentsController.createComment);
router.patch('/:commentId', CommentsController.updateComment);
router.delete('/:commentId', CommentsController.removeComment);


router.get('/', CommentsController.listComments);
router.get('/:commentId', CommentsController.getComment);


module.exports = router;
