const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');

const UsersController = require('../controllers/usersController');

router.post('/register', UsersController.createUser);
router.post('/login', UsersController.loginUser);
router.post('/logout', UsersController.logoutUser);

router.get('/', UsersController.listUsers);
router.delete('/:userId', UsersController.removeUser);
router.patch('/:userId', UsersController.updateUser );


router.get('/', (req, res, next)=>{

    User.find()
    .select('_id email password')
    .exec()
    .then(result=>{
        return res.status(200).json(result);
    })
    .catch(err=>{
        return res.status(500).json({error: err})
    });


});



router.delete('/:userId', (req, res, next)=>{
    const uid = req.params.userId;

    User.remove({_id: uid})
    .exec()
    .then(result=>{
        return res.status(200).json({message: 'User was Successfully Deleted'});
    })
    .catch(err=>{
        return res.status(500).json({error: err});
    });

});


module.exports = router;


