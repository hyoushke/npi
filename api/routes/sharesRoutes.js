const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


//Middlewares
const SecurityCheckAuthMiddleware = require('../middlewares/check-auth');

//Controllers
const SharesController = require('../controllers/sharesController');


router.post('/', SharesController.createView);
router.patch('/:postId', SharesController.updateShare);
router.delete('/:postId', SharesController.removeShare);


router.get('/', SharesController.listShare);
router.get('/:postId', SharesController.getShare);


module.exports = router;