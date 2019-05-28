const express = require('express');
const router = express.Router();
const multer = require('multer');
const bodyParser = require('body-parser');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

const User = require('../models/usersModel');

router.post('/register', UsersController.createUser);
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

router.post('/login', (req, res, next)=>{

    const email = req.body.email;
    const password = req.body.password;

    User.find({email: email})
    .exec()
    .then(user=>{

        if(user.length < 1)
        {
            //if it does not exist throw response
            return res.status(401).json({message: 'User Authentication Failed'});
        }


        //if it exists then continue here
        bcrypt.compare(password, user[0].password, (err, result)=>{

            if(err)
            {
                return res.status(401).json({message: 'User Authentication Failed', error: err});
            }

            if(result)
            {
                const token = jwt.sign(
                        {
                          email: user[0].email, 
                          id: user[0]._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                return res.status(200).json({message: 'User Successfully Login', token: token});
            }

        })

        

    })
    .catch(err=>{
        return res.status(500).json({error: err});
    })


});

module.exports = router;


