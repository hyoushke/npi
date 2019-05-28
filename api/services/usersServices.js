const mongoose = require('mongoose');
const ObjectId = require('mongoose').Types.ObjectId;

const UsersModel = require('../models/usersModel');


const createUser = async ()=>{

    const isEmailFound = await isEmailAlreadyExists(email);

};

const getUser = async ()=>{

};

const updateUser = async ()=>{

};

const removeUser = async ()=>{

};


const listUsers = async ()=>{

};



const isEmailAlreadyExists = async (email)=>{

};

const isUserExists = async ()=>{

};

exports.createUser = createUser;
exports.updateUser = updateUser;
exports.listUsers = listUsers;
exports.removeUser = removeUser;
exports.getUser = getUser;