const mongoose = require('mongoose');
const bcrypt  = require('bcrypt');
const ObjectId = require('mongoose').Types.ObjectId;

const UsersModel = require('../models/usersModel');


const createUser = async (status, username, email, password, firstname, lastname, gender, avatar, datecreated, datemodified)=>{

    try
    {
        const userData = await getUserByEmail(email);
        if(userData)
        {
            throw ("Email Already Exists");
        }

        const brcyptPassword = await getBrcryptPassword(password);
        if(brcyptPassword)
        {
            throw ("Password could not be encripted");
        }

        const User = new UsersModel({
            _id: new mongoose.Types.ObjectId(),
            status : status,
            username : username,
            email : email,
            password : password,
            firstname : firstname,
            lastname : lastname,
            gender : gender,
            avatar : avatar,
            datecreated : datecreated,
            datemodified : datemodified,
        });
    
        const usersServiceData = await User
        .save()
        .then(doc=>
        {
            return doc;
        })
        .catch(error=>
        {
            return error;
        });

        if(!usersServiceData._id)
        {
            throw ("User was not Created");
        }

    }
    catch(error)
    {
        return {error: error};
    }
};

const getUser = async (userId)=>{

};

const updateUser = async (userId)=>{

};

const removeUser = async (userId)=>{

};


const listUsers = async ()=>{

};



const getUserByEmail = async (email)=>{

    const userData = await UsersModel.find({email: email})
    .exec()
    .then(doc=>{return doc})
    .catch(error=>{ return error});

    return userData;
};

const getBrcryptPassword = async (password)=>{
    const hash = bcrypt.hash(password, 10, (err, hash)=>{
        if(err)
        {
            return error;
        }
        else
        {
            return hash;
        }
    });

    return hash;
}

const isUserExists = async ()=>{

};

const loginUser = async (username, password)=> {

}

const logoutUser = async ()=> {

}

exports.createUser = createUser;
exports.updateUser = updateUser;
exports.listUsers = listUsers;
exports.removeUser = removeUser;
exports.getUser = getUser;